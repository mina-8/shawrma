<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FactNumberResource\Pages;
use App\Filament\Resources\FactNumberResource\RelationManagers;
use App\Models\OurStory;
use App\Models\FactNumber;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class FactNumberResource extends Resource
{
    protected static ?string $model = FactNumber::class;

    protected static ?string $navigationIcon = 'heroicon-m-presentation-chart-line';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.control webiste');
    }

    public static function getNavigationSort(): ?int
    {
        return 3;
    }

    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/activity.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/activity.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/activity.title');
    }


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                    ->schema([
                        Forms\Components\Select::make('factable_type')
                            ->label('Related Type')
                            ->options([
                                OurStory::class => 'قصتنا',

                            ])
                            ->reactive()
                            ->nullable(),
                        Forms\Components\Select::make('factable_id')
                            ->label('Related Item')
                            ->options(function (callable $get) {
                                $type = $get('factable_type');

                                if ($type === OurStory::class) {
                                    return OurStory::pluck('title', 'id');
                                }

                                return [];
                            })
                            ->searchable()
                            ->nullable()
                            ->visible(fn(callable $get) => filled($get('factable_type'))),
                        LanguageTabs::make([
                            Forms\Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/blog.fields.title'))
                                ->required(),
                        ]),
                        Forms\Components\TextInput::make('number')
                            ->label(__('filament-panels::resources/pages/blog.fields.title'))
                            ->required(),
                        Forms\Components\FileUpload::make('image')
                            ->label(__('filament-panels::resources/pages/blog.fields.image'))
                            ->image()
                            ->disk('public')
                            ->directory('uploads/factsnumber')
                            ->visibility('public')
                            ->maxSize(4096)
                            ->getUploadedFileNameForStorageUsing(function ($file) {
                                $extension = $file->getClientOriginalExtension();
                                return Str::uuid() . '.' . $extension;
                            })
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml'])
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
                    ->label(__('filament-panels::resources/pages/blog.fields.title'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('number')
                    ->label(__('filament-panels::resources/pages/blog.fields.title'))
                    ->searchable(),

                Tables\Columns\ImageColumn::make('image')
                    ->label(__('filament-panels::resources/pages/blog.fields.image'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('factable_type')
                    ->label('Related Type')
                    ->formatStateUsing(function (?string $state) {
                        return match ($state) {
                            OurStory::class => 'Project',
                            // \App\Models\Service::class => 'Service',
                            default => '-',
                        };
                    }),
                Tables\Columns\TextColumn::make('factable.name') // assuming the related model has a "name" column
                    ->label('Related Name')
                    ->default('-'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/blog.fields.created_at'))
                    ->dateTime()
                    ->sortable(),
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
                    ->before(function (FactNumber $record) {
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
            'index' => Pages\ListFactNumbers::route('/'),
            'create' => Pages\CreateFactNumber::route('/create'),
            'edit' => Pages\EditFactNumber::route('/{record}/edit'),
        ];
    }
}
