<?php

namespace App\Filament\Resources\ProductInfoResource\Pages;

use App\Filament\Resources\ProductInfoResource;
use App\Models\ProductInfo;
use App\Models\CoreStation;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
class CreateProductInfo extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;
    protected static string $resource = ProductInfoResource::class;

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/aboutus.fields.header'))
                ->description(__('filament-panels::resources/pages/aboutus.fields.description'))
                ->schema([

                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('nav_title')
                                ->label(__('filament-panels::resources/pages/aboutus.fields.title'))
                                ->required(),
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/aboutus.fields.title'))
                                ->required(),


                            Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/aboutus.fields.content')),


                            Components\Hidden::make('slug')
                                ->label('Slug'),
                        ]),
                    ]),
                    Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/aboutus.fields.image'))
                        ->disk('public')
                        ->directory('uploads/howmake')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                        ->required(),
                ]),
            Step::make(__('filament-panels::resources/pages/aboutus.fields.create_station.header'))
                ->description(__('filament-panels::resources/pages/aboutus.fields.create_station.description'))
                ->schema([
                    Components\Repeater::make('create_core_station')
                        ->label(__('filament-panels::resources/pages/aboutus.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/aboutus.fields.create_station.title')),
                                Components\MarkdownEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/aboutus.fields.create_station.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/aboutus.fields.image'))
                                ->disk('public')
                                ->directory('uploads/stations')
                                ->visibility('public')
                                ->maxSize(4096)
                                ->getUploadedFileNameForStorageUsing(function ($file) {
                                    $extension = $file->getClientOriginalExtension();
                                    return Str::uuid() . '.' . $extension;
                                })
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                                ->required(),
                        ])
                        ->addActionLabel(__('filament-panels::resources/pages/aboutus.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),

        ];
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {

        if (!empty($data['nav_title']['ar'])) {
            $data['slug']['ar'] = str_replace(' ', '-', $data['nav_title']['ar']);
        }

        if (!empty($data['nav_title']['en'])) {
            $data['slug']['en'] = str_replace(' ', '-', $data['nav_title']['en']);
        }

        return $data;
    }

    protected function afterCreate(): void
    {

        // create core station
        $CreateCoreStation = $this->form->getState()['create_core_station'] ?? [];
        if (!empty($CreateCoreStation) && $this->record) {
            foreach ($CreateCoreStation as $corestation) {
                CoreStation::create([
                    'title' => $corestation['title'],
                    'content' => $corestation['content'],
                    'image' => $corestation['image'],
                    'stationable_id' => $this->record->id,
                    'stationable_type' => ProductInfo::class
                ]);
            }
        }
    }
}
