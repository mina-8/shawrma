<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OurBlogResource\Pages;
use App\Filament\Resources\OurBlogResource\RelationManagers;
use App\Models\OurBlog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;

class OurBlogResource extends Resource
{
    protected static ?string $model = OurBlog::class;

    protected static ?string $navigationIcon = 'polaris-globe-icon';
    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.about_us');
    }
    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/ourblog.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/ourblog.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/ourblog.title');
    }

    public static function getNavigationSort(): ?int
    {
        return 3;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                    ->schema([
                        LanguageTabs::make([
                            Forms\Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/ourblog.fields.title'))
                                ->required(),
                            Forms\Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/ourblog.fields.content')),
                            Forms\Components\Hidden::make('slug')
                                ->label('slug'),
                        ]),

                        Forms\Components\FileUpload::make('image')
                            ->label(__('filament-panels::resources/pages/ourblog.fields.image'))
                            ->image()
                            ->disk('public')
                            ->directory('uploads/ourblog')
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
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->label(__('filament-panels::resources/pages/ourblog.fields.title'))
                    ->searchable(),

                Tables\Columns\ImageColumn::make('image')
                    ->label(__('filament-panels::resources/pages/ourblog.fields.image'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/ourblog.fields.created_at'))
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
            'index' => Pages\ListOurBlogs::route('/'),
            'create' => Pages\CreateOurBlog::route('/create'),
            'edit' => Pages\EditOurBlog::route('/{record}/edit'),
        ];
    }
}
