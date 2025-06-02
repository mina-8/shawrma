<?php

namespace App\Filament\Resources\OurBrandResource\Pages;

use App\Filament\Resources\OurBrandResource;
use App\Models\CoreStation;
use App\Models\OurBrand;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;


class EditOurBrand extends EditRecord
{
    use EditRecord\Concerns\HasWizard;
    protected static string $resource = OurBrandResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->requiresConfirmation()
                ->before(function () {
                    $record = $this->record;

                    // Delete associated image
                    if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                        Storage::disk('public')->delete($record->image);
                    }

                    // Delete associated PDF
                    if (!empty($record->pdf) && Storage::disk('public')->exists($record->pdf)) {
                        Storage::disk('public')->delete($record->pdf);
                    }

                    // Delete associated PDF
                    if (!empty($record->banner) && Storage::disk('public')->exists($record->banner)) {
                        Storage::disk('public')->delete($record->banner);
                    }

                    // Delete associated usage instructions
                    $corestation = CoreStation::where('stationable_id', $record->id)
                        ->where('stationable_type', OurBrand::class)->get();
                    foreach ($corestation as $corestations) {
                        if (!empty($corestations->image) && Storage::disk('public')->exists($corestations->image)) {
                            Storage::disk('public')->delete($corestations->image);
                        }
                        $corestations->delete();
                    }
                }),
        ];
    }

    protected function getSteps(): array
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
                    Components\Repeater::make('edit_core_station')
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

    protected function getDefaultCoreStations(): array
    {
        return CoreStation::where('stationable_id', $this->record->id)
            ->where('stationable_type', OurBrand::class) // Assuming you're using a 'type' column to distinguish them
            ->get()
            ->map(function ($station) {
                $title = $station->getTranslations('title');
                $content = $station->getTranslations('content');
                return [
                    'id' => $station->id,
                    'title' => $title,
                    'content' => $content,
                    'image' => $station->image,
                ];
            })->toArray();
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {

        $data['edit_core_station'] = $this->getDefaultCoreStations();
        return $data;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {

        $record = $this->record;

        // Handle banner file replacement
        if (isset($data['banner']) && $data['banner'] !== $record->banner) {
            if (!empty($record->banner) && Storage::disk('public')->exists($record->banner)) {
                Storage::disk('public')->delete($record->banner);
            }
        }

        // Handle image file replacement
        if (isset($data['image']) && $data['image'] !== $record->image) {
            if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                Storage::disk('public')->delete($record->image);
            }
        }

        // Generate slugs for updated titles
        if (!empty($data['header_title']['ar'])) {
            $data['slug']['ar'] = str_replace(' ', '-', $data['header_title']['ar']);
        }

        if (!empty($data['header_title']['en'])) {
            $data['slug']['en'] = str_replace(' ', '-', $data['header_title']['en']);
        }


        return $data;
    }

    protected function afterSave(): void
    {


        // handel core station
        $EditCoreStation = $this->form->getState()['edit_core_station'] ?? [];
        $ExistCoreStation = CoreStation::where('stationable_id', $this->record->id)
            ->where('stationable_type', OurBrand::class)
            ->pluck('id')->toArray();

        $submitedStationId = array_filter(array_column($EditCoreStation, 'id'));

        // Identify and delete removed stations (including their images)
        foreach ($ExistCoreStation as $deleteStationId) {
            if (!in_array($deleteStationId, $submitedStationId)) {
                $deletestation = CoreStation::find($deleteStationId);

                if ($deletestation && !empty($deletestation->image) && Storage::disk('public')->exists($deletestation->image)) {
                    Storage::disk('public')->delete($deletestation->image);
                }

                $deletestation?->delete();
            }
        }


        foreach ($EditCoreStation as $coreStation) {
            $dataStation = [
                'title' => $coreStation['title'],
                'content' => $coreStation['content'],
                'image' => $coreStation['image'],
                'stationable_id' => $this->record->id,
                'stationable_type' => OurBrand::class
            ];

            if (!empty($coreStation['id'])) {
                CoreStation::where('id', $coreStation['id'])->update($dataStation);
            } else {
                CoreStation::create($dataStation);
            }
        }
    }
}
