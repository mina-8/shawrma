<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BranshResource\Pages;
use App\Filament\Resources\BranshResource\RelationManagers;
use App\Models\Bransh;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Rawilk\FilamentQuill\Filament\Forms\Components\QuillEditor;

class BranshResource extends Resource
{
    protected static ?string $model = Bransh::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/branch.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/branch.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/branch.title');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make('1')
                ->schema([


                QuillEditor::make('content')
                ->label(__('filament-panels::resources/pages/branch.fields.content'))
                    ->required(),
                TextInput::make('map')
                ->label(__('filament-panels::resources/pages/branch.fields.map'))
                    ->required(),
                Forms\Components\FileUpload::make('video')
                    ->label(__('filament-panels::resources/pages/branch.fields.video'))
                    ->image()
                    ->disk('public')
                    ->directory('uploads/branch')
                    ->visibility('public')
                    ->maxSize(512000)
                    ->getUploadedFileNameForStorageUsing(function ($file) {
                        $extension = $file->getClientOriginalExtension();
                        return Str::uuid() . '.' . $extension;
                    })
                    ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/ogg']),
                                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('content')
                    ->label(__('filament-panels::resources/pages/branch.fields.content'))
                    ->searchable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/branch.fields.created_at'))
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
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListBranshes::route('/'),
            'create' => Pages\CreateBransh::route('/create'),
            'edit' => Pages\EditBransh::route('/{record}/edit'),
        ];
    }
}
