<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Filament\Forms\Components;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;


    protected static ?string $navigationIcon = 'polaris-product-add-icon';

    public static function getNavigationGroup():string
    {
        return __('filament-panels::resources/pages/mainproduct.navigationgroup');
    }


    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/product.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/product.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/product.title');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Forms\Components\Grid::make(1)

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->label(__('filament-panels::resources/pages/product.fields.title'))
                    ->searchable(),
                
                Tables\Columns\ImageColumn::make('image')
                    ->label(__('filament-panels::resources/pages/product.fields.image'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/product.fields.created_at'))
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                ->label(__('filament-panels::resources/pages/product.actions.edit.label')),
                Tables\Actions\DeleteAction::make()
                    ->label(__('filament-panels::resources/pages/product.actions.delete.label'))
                    ->requiresConfirmation()
                    ->before(function (Product $record) {
                        if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                            Storage::disk('public')->delete($record->image);
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label(__('filament-panels::resources/pages/product.actions.delete.label'))
                        ->before(function (Collection $records) {
                            foreach ($records as $record) {
                                if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                                    Storage::disk('public')->delete($record->$record->image);
                                }
                            }
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
