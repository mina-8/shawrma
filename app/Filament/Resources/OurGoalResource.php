<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OurGoalResource\Pages;
use App\Filament\Resources\OurGoalResource\RelationManagers;
use App\Models\OurGoal;
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
class OurGoalResource extends Resource
{
    protected static ?string $model = OurGoal::class;

    protected static ?string $navigationIcon = 'polaris-globe-icon';

    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.about_us');
    }

    public static function getNavigationSort(): ?int
    {
        return 3;
    }

       public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/ourgoal.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/ourgoal.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/ourgoal.title');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->label(__('filament-panels::resources/pages/ourgoal.fields.title'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('content')
                    ->label(__('filament-panels::resources/pages/ourgoal.fields.content'))
                    ->searchable(),
                Tables\Columns\ImageColumn::make('color')
                    ->label(__('filament-panels::resources/pages/ourgoal.fields.image'))
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/ourgoal.fields.created_at'))
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
                    ->before(function (OurGoal $record) {
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
            'index' => Pages\ListOurGoals::route('/'),
            'create' => Pages\CreateOurGoal::route('/create'),
            'edit' => Pages\EditOurGoal::route('/{record}/edit'),
        ];
    }
}
