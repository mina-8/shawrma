<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactUsResource\Pages;
use App\Filament\Resources\ContactUsResource\RelationManagers;
use App\Models\ContactUs;
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

class ContactUsResource extends Resource
{
    protected static ?string $model = ContactUs::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    public static function getNavigationGroup(): string
    {
        return __('filament-panels::layout.webist.control webiste');
    }
    public static function getNavigationSort(): ?int
    {
        return 8;
    }


    public static function getModelLabel(): string
    {
        return __('filament-panels::resources/pages/contactus.title');
    }
    public static function getPluralModelLabel(): string
    {
        return __('filament-panels::resources/pages/contactus.title');
    }
    public static function getNavigationLabel(): string
    {
        return __('filament-panels::resources/pages/contactus.title');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(1)
                    ->schema([

                        Forms\Components\FileUpload::make('banner')
                            ->label(__('filament-panels::resources/pages/contactus.fields.image'))
                            ->image()
                            ->disk('public')
                            ->directory('uploads/contactus')
                            ->visibility('public')
                            ->maxSize(4096)
                            ->getUploadedFileNameForStorageUsing(function ($file) {
                                $extension = $file->getClientOriginalExtension();
                                return Str::uuid() . '.' . $extension;
                            })
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                            ->required(),

                        LanguageTabs::make([
                            Forms\Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/blog.fields.title'))
                                ->required(),
                        ]),

                        Forms\Components\TextInput::make('addres')
                            ->label(__('filament-panels::resources/pages/contactus.fields.addres'))
                            ->required(),
                        Forms\Components\TextInput::make('phone')
                            ->label(__('filament-panels::resources/pages/contactus.fields.phone'))
                            ->required(),
                        Forms\Components\TextInput::make('fax')
                            ->label(__('filament-panels::resources/pages/contactus.fields.fax'))
                            ->required(),
                        Forms\Components\TextInput::make('map')
                            ->label(__('filament-panels::resources/pages/contactus.fields.map'))
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
                    ->label(__('filament-panels::resources/pages/contactus.fields.name'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('addres')
                    ->label(__('filament-panels::resources/pages/contactus.fields.email'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone')
                    ->label(__('filament-panels::resources/pages/contactus.fields.phone'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('fax')
                    ->label(__('filament-panels::resources/pages/contactus.fields.country'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('filament-panels::resources/pages/contactform.fields.created_at'))
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
                    ->before(function (ContactUs $record) {
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
            'index' => Pages\ListContactUs::route('/'),
            'create' => Pages\CreateContactUs::route('/create'),
            'edit' => Pages\EditContactUs::route('/{record}/edit'),
        ];
    }
}
