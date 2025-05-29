<?php

namespace App\Filament\Resources\SustainabilityResource\Pages;

use App\Filament\Resources\SustainabilityResource;
use App\Models\CoreStation;
use App\Models\CoreVesion;
use App\Models\Sustainability;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;

class EditSustainability extends EditRecord
{
    use EditRecord\Concerns\HasWizard;
    protected static string $resource = SustainabilityResource::class;

    // protected function getHeaderActions(): array
    // {
    //     return [
    //         Actions\DeleteAction::make(),
    //     ];
    // }

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/sustainability.fields.header'))
                ->description(__('filament-panels::resources/pages/sustainability.fields.description'))
                ->schema([
                    Components\FileUpload::make('banner')
                        ->label(__('filament-panels::resources/pages/sustainability.fields.banner'))
                        ->disk('public')
                        ->directory('uploads/aboutus/banner')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']),
                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/sustainability.fields.title'))
                                ->required(),


                            Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/sustainability.fields.content')),

                        ]),
                    ]),
                    Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/sustainability.fields.image'))
                        ->disk('public')
                        ->directory('uploads/sustainablility')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                        ->required(),
                        Components\FileUpload::make('pdf')
                            ->label(__('filament-panels::resources/pages/product.fields.pdf'))
                            ->disk('public')
                            ->directory('uploads/sustainablility')
                            ->visibility('public')
                            ->maxSize(4096)
                            ->getUploadedFileNameForStorageUsing(function ($file) {
                                $extension = $file->getClientOriginalExtension();
                                return Str::uuid() . '.' . $extension;
                            })
                            ->acceptedFileTypes(['application/pdf'])
                            ->required(),
                ]),
            Step::make(__('filament-panels::resources/pages/sustainability.fields.create_vesion.header'))
                ->description(__('filament-panels::resources/pages/sustainability.fields.create_vesion.description'))
                ->schema([
                    Components\Repeater::make('edit_core_vesion')
                        ->label(__('filament-panels::resources/pages/sustainability.fields.create_vesion.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/sustainability.fields.create_vesion.title')),
                                Components\MarkdownEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/sustainability.fields.create_vesion.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/sustainability.fields.image'))
                                ->disk('public')
                                ->directory('uploads/vesion')
                                ->visibility('public')
                                ->maxSize(4096)
                                ->getUploadedFileNameForStorageUsing(function ($file) {
                                    $extension = $file->getClientOriginalExtension();
                                    return Str::uuid() . '.' . $extension;
                                })
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp' , 'image/svg+xml'])
                                ->required(),
                        ])
                        ->addActionLabel(__('filament-panels::resources/pages/sustainability.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),
            Step::make(__('filament-panels::resources/pages/sustainability.fields.create_station.header'))
                ->description(__('filament-panels::resources/pages/sustainability.fields.create_station.description'))
                ->schema([
                    Components\Repeater::make('edit_core_station')
                        ->label(__('filament-panels::resources/pages/sustainability.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/sustainability.fields.create_station.title')),
                                Components\MarkdownEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/sustainability.fields.create_station.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/sustainability.fields.image'))
                                ->disk('public')
                                ->directory('uploads/stations')
                                ->visibility('public')
                                ->maxSize(4096)
                                ->getUploadedFileNameForStorageUsing(function ($file) {
                                    $extension = $file->getClientOriginalExtension();
                                    return Str::uuid() . '.' . $extension;
                                })
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp' , 'image/svg+xml'])
                                ->required(),
                        ])
                        ->addActionLabel(__('filament-panels::resources/pages/sustainability.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),

        ];
    }

    protected function getDefaultCoreVesion(): array
    {
        return CoreVesion::where('vesionable_id', $this->record->id)
            ->where('vesionable_type', Sustainability::class)
            ->get()
            ->map(function ($vesions) {
                $title = $vesions->getTranslations('title');
                $content = $vesions->getTranslations('content');
                return [
                    'id' => $vesions->id,
                    'title' => $title,
                    'content' => $content,
                    'image' => $vesions->image,
                ];
            })->toArray();
    }

    protected function getDefaultCoreStations(): array
    {
        return CoreStation::where('stationable_id', $this->record->id)
            ->where('stationable_type', Sustainability::class) // Assuming you're using a 'type' column to distinguish them
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
        $data['edit_core_vesion'] = $this->getDefaultCoreVesion();
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

        // Handle PDF file replacement
        if (isset($data['pdf']) && $data['pdf'] !== $record->pdf) {
            if (!empty($record->pdf) && Storage::disk('public')->exists($record->pdf)) {
                Storage::disk('public')->delete($record->pdf);
            }
        }

        return $data;
    }

    protected function afterSave(): void
    {

        // handel core vesion
        $EditCoreVesion = $this->form->getState()['edit_core_vesion'] ?? [];
        $ExistCoreVesion = CoreVesion::where('vesionable_id', $this->record->id)
            ->where('vesionable_type', Sustainability::class)
            ->pluck('id')->toArray();
        $SubmitedVesionId = array_filter(array_column($EditCoreVesion, 'id'));

        // Identify and delete removed stations (including their images)
        foreach ($ExistCoreVesion as $deletevesionId) {
            if (!in_array($deletevesionId, $SubmitedVesionId)) {
                $deletevesion = CoreVesion::find($deletevesionId);

                if ($deletevesion && !empty($deletevesion->image) && Storage::disk('public')->exists($deletevesion->image)) {
                    Storage::disk('public')->delete($deletevesion->image);
                }

                $deletevesion?->delete();
            }
        }


        foreach ($EditCoreVesion as $corevesion) {
            $dataVesion = [
                'title' => $corevesion['title'],
                'content' => $corevesion['content'],
                'image' => $corevesion['image'],
                'vesionable_id' => $this->record->id,
                'vesionable_type' => Sustainability::class
            ];

            if (!empty($corevesion['id'])) {
                CoreVesion::where('id', $corevesion['id'])->update($dataVesion);
            } else {
                CoreVesion::create($dataVesion);
            }
        }

        // handel core station
        $EditCoreStation = $this->form->getState()['edit_core_station'] ?? [];
        $ExistCoreStation = CoreStation::where('stationable_id', $this->record->id)
            ->where('stationable_type', Sustainability::class)
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
                'stationable_type' => Sustainability::class
            ];

            if (!empty($coreStation['id'])) {
                CoreStation::where('id', $coreStation['id'])->update($dataStation);
            } else {
                CoreStation::create($dataStation);
            }
        }
    }
}
