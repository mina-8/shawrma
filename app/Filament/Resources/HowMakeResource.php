<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HowMakeResource\Pages;
use App\Filament\Resources\HowMakeResource\RelationManagers;
use App\Models\HowMake;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class HowMakeResource extends Resource
{
    protected static ?string $model = HowMake::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.how_make');
    }

    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/howmake.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/howmake.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/howmake.title');
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
                    ->label(__('filament-panels::resources/pages/blog.fields.title'))
                    ->searchable(),

                Tables\Columns\ImageColumn::make('image')
                    ->label(__('filament-panels::resources/pages/blog.fields.image'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/blog.fields.created_at'))
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
            'index' => Pages\ListHowMakes::route('/'),
            'create' => Pages\CreateHowMake::route('/create'),
            'edit' => Pages\EditHowMake::route('/{record}/edit'),
        ];
    }
}
