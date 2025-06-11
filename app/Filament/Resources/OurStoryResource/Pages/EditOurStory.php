<?php

namespace App\Filament\Resources\OurStoryResource\Pages;

use App\Filament\Resources\OurStoryResource;
use App\Models\CoreStation;
use App\Models\CoreStory;
use App\Models\OurStory;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;

class EditOurStory extends EditRecord
{
    use EditRecord\Concerns\HasWizard;
    protected static string $resource = OurStoryResource::class;

    // protected function getHeaderActions(): array
    // {
    //     return [
    //         Actions\DeleteAction::make()
    //             ->requiresConfirmation()
    //             ->before(function () {
    //                 $record = $this->record;
    //                 // delete banner
    //                 if (!empty($record->banner) && Storage::disk('public')->exists($record->banner)) {
    //                     Storage::disk('public')->delete($record->banner);
    //                 }
    //                 // delete image
    //                 if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
    //                     Storage::disk('public')->delete($record->image);
    //                 }

    //                 // delete core story
    //                 CoreStory::where('storyable_id', $record->id)->delete();
    //             }),
    //     ];
    // }

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/ourstory.fields.header'))
                ->description(__('filament-panels::resources/pages/ourstory.fields.description'))
                ->schema([
                    Components\FileUpload::make('banner')
                        ->label(__('filament-panels::resources/pages/ourstory.fields.banner'))
                        ->disk('public')
                        ->directory('uploads/aboutus/banner')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                        ,
                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/ourstory.fields.title'))
                                ->required(),

                            Components\MarkdownEditor::make('description')
                                ->label(__('filament-panels::resources/pages/ourstory.fields.description')),

                            Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/ourstory.fields.content')),


                            Components\Hidden::make('slug')
                                ->label('Slug'),
                        ]),
                    ]),
                    Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/ourstory.fields.image'))
                        ->disk('public')
                        ->directory('uploads/aboutus')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                        ->required(),
                ]),
            Step::make(__('filament-panels::resources/pages/ourstory.fields.create_station.header'))
                ->description(__('filament-panels::resources/pages/ourstory.fields.create_station.description'))
                ->schema([
                    Components\Repeater::make('edit_core_station')
                        ->label(__('filament-panels::resources/pages/ourstory.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourstory.fields.create_station.title')),
                                Components\MarkdownEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/ourstory.fields.create_station.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/ourstory.fields.image'))
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
                        ->addActionLabel(__('filament-panels::resources/pages/ourstory.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),
            Step::make(__('filament-panels::resources/pages/ourstory.fields.create_story.header'))
                ->description(__('filament-panels::resources/pages/ourstory.fields.create_story.description'))
                ->schema([
                    Components\Repeater::make('edit_core_story')
                        ->label(__('filament-panels::resources/pages/ourstory.fields.create_story.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourstory.fields.create_story.title'))
                                    ,
                            ]),
                            Components\TextInput::make('youtube_link')
                                ->label(__('filament-panels::resources/pages/ourstory.fields.create_story.video'))

                                ->url(),
                        ])
                        ->addActionLabel(__('filament-panels::resources/pages/ourstory.fields.create_story.add_video'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ,
                ])
        ];
    }

    protected function getDefaultCoreStations(): array
    {
        return CoreStation::where('stationable_id', $this->record->id)
            ->where('stationable_type', OurStory::class) // Assuming you're using a 'type' column to distinguish them
            ->get()
            ->map(function ($station) {
                $title = $station->getTranslations('title');
                $content  = $station->getTranslations('content');
                return [
                    'id' => $station->id,
                    'title' => $title,
                    'content' => $content,
                    'image' => $station->image,
                ];
            })->toArray();
    }

    protected function getDefaultCoreStory(): array
    {
        // Load existing usage instructions for the product
        return CoreStory::where('storyable_id', $this->record->id)
            ->where('storyable_type', OurStory::class)
            ->get()
            ->map(function ($corstory) {
                $title = $corstory->getTranslations('title');

                return [
                    'id' => $corstory->id,
                    'title' => $title,
                    'youtube_link' => $corstory->youtube_link,
                ];
            })
            ->toArray();
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $data['edit_core_station'] = $this->getDefaultCoreStations();
        $data['edit_core_story'] = $this->getDefaultCoreStory();
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
        if (!empty($data['title']['ar'])) {
            $data['slug']['ar'] = str_replace(' ', '-', $data['title']['ar']);
        }

        if (!empty($data['title']['en'])) {
            $data['slug']['en'] = str_replace(' ', '-', $data['title']['en']);
        }


        return $data;
    }

    protected function convertToEmbedLink(string $url): string
    {
        if (preg_match('/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/', $url, $match)) {
            return "https://www.youtube.com/embed/{$match[1]}";
        }

        if (preg_match('/(youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/', $url, $match)) {
            return "https://www.youtube.com/embed/{$match[2]}";
        }

        throw \Illuminate\Validation\ValidationException::withMessages([
            'edit_core_story' => ['One or more YouTube URLs are invalid.'],
        ]);
    }


    protected function afterSave(): void
    {

        // handel core station
        $EditCoreStation = $this->form->getState()['edit_core_station'] ?? [];
        $ExistCoreStation = CoreStation::where('stationable_id', $this->record->id)
            ->where('stationable_type', OurStory::class)
            ->pluck('id')->toArray();

        $submitedStationId = array_filter(array_column($EditCoreStation, 'id'));

        // Identify and delete removed stations (including their images)

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
                'stationable_type' => OurStory::class
            ];

            if (!empty($coreStation['id'])) {
                CoreStation::where('id', $coreStation['id'])->update($dataStation);
            } else {
                CoreStation::create($dataStation);
            }
        }

        // handel core story
        $EditCoreStory = $this->form->getState()['edit_core_story'] ?? [];
        $ExistingIds = CoreStory::where('storyable_id', $this->record->id)
            ->where('storyable_type', OurStory::class)
            ->pluck('id')->toArray();
        $submittedIds = array_filter(array_column($EditCoreStory, 'id'));

        // delete remove useage core story
        $idsStoryToDelete = array_diff($ExistingIds, $submittedIds);
        if (!empty($idsStoryToDelete)) {
            CoreStory::whereIn('id', $idsStoryToDelete)->delete();
        }

        // create or update core story
        foreach ($EditCoreStory as $corestory) {
            $embedLink = $this->convertToEmbedLink($corestory['youtube_link']);

            if (isset($corestory['id']) && in_array($corestory['id'], $ExistingIds)) {
                CoreStory::where('id', $corestory['id'])
                    ->update([
                        'title' => $corestory['title'],
                        'youtube_link' => $embedLink,
                        'storyable_id' => $this->record->id,
                        'storyable_type' => OurStory::class
                    ]);
            } else {

                CoreStory::create([
                    'title' => $corestory['title'],
                    'youtube_link' => $embedLink,
                    'storyable_id' => $this->record->id,
                    'storyable_type' => OurStory::class
                ]);
            }
        }
    }
}
