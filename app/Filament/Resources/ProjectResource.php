<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.future');
    }

    public static function getNavigationSort(): ?int
    {
        return 2; // Lower numbers appear first
    }


    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/projects.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/projects.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/projects.title');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                ->schema([
                    Forms\Components\Select::make('project_location_id')
                        ->label(__('filament-panels::resources/pages/product.fields.mainproduct'))
                        ->relationship('projectLocation', 'location')
                        ->required(),
                    LanguageTabs::make([
                        Forms\Components\TextInput::make('title')
                            ->label(__('filament-panels::resources/pages/product.fields.title'))
                            ->required(),

                        Forms\Components\MarkdownEditor::make('content')
                            ->label(__('filament-panels::resources/pages/product.fields.content')),

                        Forms\Components\TextInput::make('project_name')
                            ->label(__('filament-panels::resources/pages/product.fields.title'))
                            ->required(),
                        Forms\Components\TextInput::make('client_name')
                            ->label(__('filament-panels::resources/pages/product.fields.title'))
                            ->required(),
                        Forms\Components\TextInput::make('location')
                            ->label(__('filament-panels::resources/pages/product.fields.title'))
                            ->required(),
                        Forms\Components\Hidden::make('slug')
                            ->label('Slug'),
                    ]),
                    Forms\Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/product.fields.image'))
                        ->image()
                        ->disk('public')
                        ->directory('uploads/product')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                        ->required(),
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
                Tables\Actions\EditAction::make()
                ->label(__('filament-panels::resources/pages/blog.actions.edit.label')),

                Tables\Actions\DeleteAction::make()
                    ->label(__('filament-panels::resources/pages/blog.actions.delete.label'))
                    ->requiresConfirmation()
                    ->before(function (Project $record) {
                        if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                            Storage::disk('public')->delete($record->image);
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label(__('filament-panels::resources/pages/blog.actions.delete.label'))
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
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
