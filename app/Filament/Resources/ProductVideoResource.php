<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductVideoResource\Pages;
use App\Filament\Resources\ProductVideoResource\RelationManagers;
use App\Models\ProductVideo;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Collection;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;

class ProductVideoResource extends Resource
{
    protected static ?string $model = ProductVideo::class;

    protected static ?string $navigationIcon = 'polaris-product-add-icon';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::resources/pages/mainproduct.navigationgroup');
    }

    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/productvideo.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/productvideo.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/productvideo.title');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                    ->schema([
                        LanguageTabs::make([

                            Forms\Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/blog.fields.image'))
                                ->image()
                                ->disk('public')
                                ->directory('uploads/productvideo')
                                ->visibility('public')
                                ->maxSize(4096)
                                ->getUploadedFileNameForStorageUsing(function ($file) {
                                    $extension = $file->getClientOriginalExtension();
                                    return Str::uuid() . '.' . $extension;
                                })
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                                ->required(),
                        ]),
                        Forms\Components\TextInput::make('youtube_link')
                            ->label(__('filament-panels::resources/pages/ourstory.fields.create_story.video'))
                            ->required()
                            ->url(),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                
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
                    ->before(function (ProductVideo $record) {
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
            'index' => Pages\ListProductVideos::route('/'),
            'create' => Pages\CreateProductVideo::route('/create'),
            'edit' => Pages\EditProductVideo::route('/{record}/edit'),
        ];
    }
}
