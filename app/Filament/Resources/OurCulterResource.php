<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OurCulterResource\Pages;
use App\Filament\Resources\OurCulterResource\RelationManagers;
use App\Models\OurCulter;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OurCulterResource extends Resource
{
    protected static ?string $model = OurCulter::class;

    protected static ?string $navigationIcon = 'polaris-globe-icon';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.about_us');
    }

    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/ourculter.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/ourculter.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/ourculter.title');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->label(__('filament-panels::resources/pages/ourculter.fields.title'))
                    ->searchable(),

                Tables\Columns\ImageColumn::make('banner')
                    ->label(__('filament-panels::resources/pages/ourculter.fields.banner'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\ImageColumn::make('image')
                    ->label(__('filament-panels::resources/pages/ourculter.fields.image'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/ourculter.fields.created_at'))
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
            'index' => Pages\ListOurCulters::route('/'),
            'create' => Pages\CreateOurCulter::route('/create'),
            'edit' => Pages\EditOurCulter::route('/{record}/edit'),
        ];
    }
}
