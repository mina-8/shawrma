<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AboutUsResource\Pages;
use App\Filament\Resources\AboutUsResource\RelationManagers;
use App\Models\AboutUs;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Illuminate\Support\Str;

class AboutUsResource extends Resource
{
    protected static ?string $model = AboutUs::class;

    protected static ?string $navigationIcon = 'polaris-globe-icon';

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
                Forms\Components\Grid::make(1)
                    ->schema([
                        LanguageTabs::make([
                            Forms\Components\TextInput::make('main_title')
                                ->label(__('filament-panels::resources/pages/blog.fields.title'))
                                ->required(),
                            Forms\Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/blog.fields.title'))
                                ->required(),
                            Forms\Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/blog.fields.content')),
                            Forms\Components\Hidden::make('slug')
                                ->label('slug'),
                        ]),
                        Forms\Components\FileUpload::make('image')
                            ->label(__('filament-panels::resources/pages/blog.fields.image'))
                            ->image()
                            ->disk('public')
                            ->directory('uploads/blogs')
                            ->visibility('public')
                            ->maxSize(4096)
                            ->getUploadedFileNameForStorageUsing(function ($file) {
                                $extension = $file->getClientOriginalExtension();
                                return Str::uuid() . '.' . $extension;
                            })
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                            ->required(),
                    ]),
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
                Tables\Actions\EditAction::make()

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
            'index' => Pages\ListAboutUs::route('/'),
            'create' => Pages\CreateAboutUs::route('/create'),
            'edit' => Pages\EditAboutUs::route('/{record}/edit'),
        ];
    }
}
