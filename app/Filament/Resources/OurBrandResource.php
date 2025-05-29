<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OurBrandResource\Pages;
use App\Filament\Resources\OurBrandResource\RelationManagers;
use App\Models\CoreStation;
use App\Models\OurBrand;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Collection;

class OurBrandResource extends Resource
{
    protected static ?string $model = OurBrand::class;

    protected static ?string $navigationIcon = 'polaris-flower-filled-icon';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.control webiste');
    }
    public static function getNavigationSort(): ?int
    {
        return 5;
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
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('header_title')
                    ->label(__('filament-panels::resources/pages/brand.fields.header-title'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('title')
                    ->label(__('filament-panels::resources/pages/brand.fields.title'))
                    ->searchable(),

                Tables\Columns\ImageColumn::make('banner')
                    ->label(__('filament-panels::resources/pages/brand.fields.banner'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\ImageColumn::make('image')
                    ->label(__('filament-panels::resources/pages/brand.fields.image'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/brand.fields.created_at'))
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->label(__('filament-panels::resources/pages/product.actions.delete.label'))
                    ->requiresConfirmation()
                    ->before(function (OurBrand $record) {
                        // Delete associated image
                        if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                            Storage::disk('public')->delete($record->image);
                        }

                        // Delete associated PDF
                        if (!empty($record->pdf) && Storage::disk('public')->exists($record->pdf)) {
                            Storage::disk('public')->delete($record->pdf);
                        }

                        // Delete associated PDF
                        if (!empty($record->banner) && Storage::disk('public')->exists($record->banner)) {
                            Storage::disk('public')->delete($record->banner);
                        }

                        // Delete associated usage instructions
                        $corestation = CoreStation::where('stationable_id', $record->id)
                            ->where('stationable_type', OurBrand::class)->get();
                        foreach ($corestation as $corestations) {
                            if (!empty($corestations->image) && Storage::disk('public')->exists($corestations->image)) {
                                Storage::disk('public')->delete($corestations->image);
                            }
                            $corestations->delete();
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label(__('filament-panels::resources/pages/product.actions.delete.label'))
                        ->before(function (Collection $records) {
                            foreach ($records as $record) {
                                // Delete associated image
                                if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                                    Storage::disk('public')->delete($record->image);
                                }

                                // Delete associated PDF
                                if (!empty($record->pdf) && Storage::disk('public')->exists($record->pdf)) {
                                    Storage::disk('public')->delete($record->pdf);
                                }

                                // Delete associated PDF
                                if (!empty($record->banner) && Storage::disk('public')->exists($record->banner)) {
                                    Storage::disk('public')->delete($record->banner);
                                }

                                // Delete associated usage instructions
                                $corestation = CoreStation::where('stationable_id', $record->id)
                                    ->where('stationable_type', OurBrand::class)->get();
                                foreach ($corestation as $corestations) {
                                    if (!empty($corestations->image) && Storage::disk('public')->exists($corestations->image)) {
                                        Storage::disk('public')->delete($corestations->image);
                                    }
                                    $corestations->delete();
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
            'index' => Pages\ListOurBrands::route('/'),
            'create' => Pages\CreateOurBrand::route('/create'),
            'edit' => Pages\EditOurBrand::route('/{record}/edit'),
        ];
    }
}
