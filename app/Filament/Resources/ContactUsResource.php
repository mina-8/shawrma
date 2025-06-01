<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactUsResource\Pages;
use App\Filament\Resources\ContactUsResource\RelationManagers;
use App\Models\ContactUs;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ContactUsResource extends Resource
{
    protected static ?string $model = ContactUs::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.control webiste');
    }
    public static function getNavigationSort(): ?int
    {
        return 8;
    }
    public static function canCreate(): bool
    {
        return false;
    }

    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/contactus.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/contactus.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/contactus.title');
    }

    // public static function form(Form $form): Form
    // {
    //     return $form
    //         ->schema([
    //             //
    //         ]);
    // }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('type')
                    ->label(__('filament-panels::resources/pages/contactus.fields.type'))
                    ->formatStateUsing(fn (string $state) => __('filament-panels::resources/pages/contactus.fields.' . $state))
                    ->searchable(),
                Tables\Columns\TextColumn::make('name')
                    ->label(__('filament-panels::resources/pages/contactus.fields.name'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->label(__('filament-panels::resources/pages/contactus.fields.email'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone')
                    ->label(__('filament-panels::resources/pages/contactus.fields.phone'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('country')
                    ->label(__('filament-panels::resources/pages/contactus.fields.country'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('message')
                    ->label(__('filament-panels::resources/pages/contactform.fields.message'))
                    ->searchable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/contactform.fields.created_at'))
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                // Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                // Tables\Actions\BulkActionGroup::make([
                //     Tables\Actions\DeleteBulkAction::make(),
                // ]),
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
            'index' => Pages\ListContactUs::route('/'),
            'view' => Pages\ViewContactUs::route('/{record}'),
            // 'create' => Pages\CreateContactUs::route('/create'),
            // 'edit' => Pages\EditContactUs::route('/{record}/edit'),
        ];
    }
}
