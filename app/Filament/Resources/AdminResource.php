<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdminResource\Pages;
use App\Filament\Resources\AdminResource\RelationManagers;
use App\Models\Admin;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AdminResource extends Resource
{
    protected static ?string $model = Admin::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/admin.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/admin.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/admin.title');
    }

    protected static function getPolicy(): ?string
    {
        return \App\Policies\AdminPolicy::class;
    }

    public static function shouldRegisterNavigation(): bool
    {
        $user = auth('admin')->user();
        // Only show in sidebar if not staff
        return $user && $user->role !== 'staff';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label(__('filament-panels::resources/pages/admin.fields.name'))
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->label(__('filament-panels::resources/pages/admin.fields.email'))
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('password')
                    ->label(__('filament-panels::resources/pages/admin.fields.password'))
                    ->password()
                    ->required()
                    ->maxLength(255)
                    ->dehydrateStateUsing(fn($state) => !empty($state) ? bcrypt($state) : null)
                    ->visibleOn('create'),
                Forms\Components\Select::make('role')
                    ->label(__('filament-panels::resources/pages/admin.fields.role'))
                    ->options([
                        'admin' => __('filament-panels::resources/pages/admin.roles.admin'),
                        'staff' => __('filament-panels::resources/pages/admin.roles.staff'),
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->label(__('filament-panels::resources/pages/admin.fields.name'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->label(__('filament-panels::resources/pages/admin.fields.email'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('role')
                    ->label(__('filament-panels::resources/pages/admin.fields.role'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/admin.fields.created_at'))
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->visible(function ($records) {
                            // Hide the action if any selected record is an admin
                            return collect($records)->every(fn($record) => $record->role !== 'admin');
                        }),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAdmins::route('/'),
            'create' => Pages\CreateAdmin::route('/create'),
            'edit' => Pages\EditAdmin::route('/{record}/edit'),
        ];
    }
}
