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

class ProductVideoResource extends Resource
{
    protected static ?string $model = ProductVideo::class;

    protected static ?string $navigationIcon = 'polaris-product-add-icon';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::resources/pages/mainproduct.navigationgroup');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                    ->schema([
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
            'index' => Pages\ListProductVideos::route('/'),
            'create' => Pages\CreateProductVideo::route('/create'),
            'edit' => Pages\EditProductVideo::route('/{record}/edit'),
        ];
    }
}
