<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OurBrandResource\Pages;
use App\Filament\Resources\OurBrandResource\RelationManagers;
use App\Models\OurBrand;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OurBrandResource extends Resource
{
    protected static ?string $model = OurBrand::class;

    protected static ?string $navigationIcon = 'polaris-flower-filled-icon';

    public static function getNavigationGroup():string
    {
        return __('filament-panels::layout.webist.control webiste');
    }
    public static function getNavigationSort(): ?int
    {
        return 6;
    }
     public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/brand.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/brand.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/brand.title');
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
                //
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
            'index' => Pages\ListOurBrands::route('/'),
            'create' => Pages\CreateOurBrand::route('/create'),
            'edit' => Pages\EditOurBrand::route('/{record}/edit'),
        ];
    }
}
