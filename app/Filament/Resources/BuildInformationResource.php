<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BuildInformationResource\Pages;
use App\Filament\Resources\BuildInformationResource\RelationManagers;
use App\Models\BuildInformation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Illuminate\Support\Str;
class BuildInformationResource extends Resource
{
    protected static ?string $model = BuildInformation::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    public static function getNavigationGroup():string
    {
        return __('filament-panels::layout.webist.control webiste');
    }
    public static function getNavigationSort(): ?int
    {
        return 8;
    }

    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/buildinformation.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/buildinformation.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/buildinformation.title');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                    ->schema([
                        Forms\Components\FileUpload::make('banner')
                        ->label(__('filament-panels::resources/pages/ourculter.fields.banner'))
                        ->disk('public')
                        ->directory('uploads/aboutus/banner')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']),
                        LanguageTabs::make([
                            Forms\Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/blog.fields.title'))
                                ->required(),
                            Forms\Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/blog.fields.content')),

                        ]),

                    ]),
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
                // Tables\Actions\BulkActionGroup::make([
                //     Tables\Actions\DeleteBulkAction::make(),
                // ]),
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
            'index' => Pages\ListBuildInformation::route('/'),
            'create' => Pages\CreateBuildInformation::route('/create'),
            'edit' => Pages\EditBuildInformation::route('/{record}/edit'),
        ];
    }
}
