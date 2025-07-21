<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AboutusResource\Pages;
use App\Filament\Resources\AboutusResource\RelationManagers;
use App\Models\Aboutus;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AboutusResource extends Resource
{
    protected static ?string $model = Aboutus::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.about_us');
    }

    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/aboutus.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/aboutus.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/aboutus.title');
    }


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->label(__('filament-panels::resources/pages/aboutus.fields.title'))
                    ->searchable(),

                Tables\Columns\ImageColumn::make('banner')
                    ->label(__('filament-panels::resources/pages/aboutus.fields.banner'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\ImageColumn::make('image')
                    ->label(__('filament-panels::resources/pages/aboutus.fields.image'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/aboutus.fields.created_at'))
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
            'index' => Pages\ListAboutuses::route('/'),
            'create' => Pages\CreateAboutus::route('/create'),
            'edit' => Pages\EditAboutus::route('/{record}/edit'),
        ];
    }
}
