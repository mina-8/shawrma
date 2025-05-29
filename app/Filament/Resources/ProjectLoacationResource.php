<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectLoacationResource\Pages;
use App\Filament\Resources\ProjectLoacationResource\RelationManagers;
use App\Models\ProjectLoacation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
class ProjectLoacationResource extends Resource
{
    protected static ?string $model = ProjectLoacation::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.future');
    }
        public static function getNavigationSort(): ?int
    {
        return 1; // Lower numbers appear first
    }


    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/projects.breadcrumb');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/projects.breadcrumb');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/projects.breadcrumb');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                    ->schema([
                        LanguageTabs::make([
                            Forms\Components\TextInput::make('location')
                                ->label(__('filament-panels::resources/pages/mainproduct.fields.title'))
                                ->required(),

                        ]),

                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('location')
                    ->label(__('filament-panels::resources/pages/blog.fields.title'))
                    ->searchable(),

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
            'index' => Pages\ListProjectLoacations::route('/'),
            'create' => Pages\CreateProjectLoacation::route('/create'),
            'edit' => Pages\EditProjectLoacation::route('/{record}/edit'),
        ];
    }
}
