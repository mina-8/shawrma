<?php

namespace App\Filament\Resources\OurBrandResource\Pages;

use App\Filament\Resources\OurBrandResource;
use App\Models\CoreStation;
use App\Models\OurBrand;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;


class CreateOurBrand extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;
    protected static string $resource = OurBrandResource::class;

    protected function getSteps():array
    {
        return [
            Step::make(__('filament-panels::resources/pages/brand.fields.header'))
                ->description(__('filament-panels::resources/pages/brand.fields.description'))
                ->schema([
                    Components\FileUpload::make('banner')
                        ->label(__('filament-panels::resources/pages/brand.fields.banner'))
                        ->disk('public')
                        ->directory('uploads/brands/banner')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']),
                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('header_title')
                                ->label(__('filament-panels::resources/pages/brand.fields.header-title'))
                                ->required(),
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/brand.fields.title'))
                                ->required(),
                            Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/brand.fields.content')),


                            Components\Hidden::make('slug')
                                ->label('Slug'),
                        ]),
                    ]),
                    Components\TextInput::make('color')
                                ->label(__('filament-panels::resources/pages/product.fields.color')),

                    Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/brand.fields.image'))
                        ->disk('public')
                        ->directory('uploads/brands')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/svg+xml' , '.svg'])
                        ->required(),
                        Components\FileUpload::make('pdf')
                        ->label(__('filament-panels::resources/pages/product.fields.pdf'))
                        ->disk('public')
                        ->directory('uploads/pdfproduct')
                        ->visibility('public')
                        ->maxSize(51200)
                        ->rules(['file', 'mimes:pdf', 'max:51200'])
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['application/pdf'])
                        ->required(),
                ]),

            Step::make(__('filament-panels::resources/pages/brand.fields.create_station.header'))
                ->description(__('filament-panels::resources/pages/brand.fields.create_station.description'))
                ->schema([
                    Components\Repeater::make('create_core_station')
                        ->label(__('filament-panels::resources/pages/brand.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/brand.fields.create_station.title')),
                                Components\MarkdownEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/brand.fields.create_station.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/brand.fields.image'))
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
                        ->addActionLabel(__('filament-panels::resources/pages/brand.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),

        ];
    }


    protected function mutateFormDataBeforeCreate(array $data): array
    {

        if (!empty($data['header_title']['ar'])) {
            $data['slug']['ar'] = str_replace(' ', '-', $data['header_title']['ar']);
        }

        if (!empty($data['header_title']['en'])) {
            $data['slug']['en'] = str_replace(' ', '-', $data['header_title']['en']);
        }

        return $data;
    }

    protected function afterCreate(): void
    {

        // create core station
        $CreateCoreStation = $this->form->getState()['create_core_station'] ?? [];
        if(!empty($CreateCoreStation) && $this->record){
        foreach($CreateCoreStation as $corestation){
            CoreStation::create([
                'title'=> $corestation['title'],
                'content' => $corestation['content'],
                'image' => $corestation['image'],
                'stationable_id' => $this->record->id,
                'stationable_type' => OurBrand::class
            ]);
        }
        }

    }
}
