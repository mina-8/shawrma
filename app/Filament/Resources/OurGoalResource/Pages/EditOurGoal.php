<?php

namespace App\Filament\Resources\OurGoalResource\Pages;

use App\Filament\Resources\OurGoalResource;
use App\Models\CoreStation;
use App\Models\ProductVideo;
use App\Models\OurGoal;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;

class EditOurGoal extends EditRecord
{
    use EditRecord\Concerns\HasWizard;
    protected static string $resource = OurGoalResource::class;

    // protected function getHeaderActions(): array
    // {
    //     return [
    //         Actions\DeleteAction::make()
    //             ->requiresConfirmation()
    //             ->before(function () {
    //                 $record = $this->record;
    //                 if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
    //                     Storage::disk('public')->delete($record->image);
    //                 }
    //             }),
    //     ];
    // }

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/ourgoal.fields.header'))
                ->description(__('filament-panels::resources/pages/ourgoal.fields.description'))
                ->schema([

                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/ourgoal.fields.title'))
                                ->required(),

                            Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/ourgoal.fields.content')),


                            Components\Hidden::make('slug')
                                ->label('Slug'),
                        ]),
                    ]),
                    Components\TextInput::make('color')
                        ->label(__('filament-panels::resources/pages/ourgoal.fields.color')),

                ]),
            Step::make(__('filament-panels::resources/pages/ourgoal.fields.create_station.header'))
                ->description(__('filament-panels::resources/pages/ourgoal.fields.create_station.description'))
                ->schema([
                    Components\Repeater::make('edit_core_station')
                        ->label(__('filament-panels::resources/pages/ourgoal.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourgoal.fields.create_station.title')),
                                Components\MarkdownEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/ourgoal.fields.create_station.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/ourgoal.fields.image'))
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
                        ->addActionLabel(__('filament-panels::resources/pages/ourgoal.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),
            Step::make(__('filament-panels::resources/pages/ourgoal.fields.create_story.header'))
                ->description(__('filament-panels::resources/pages/ourgoal.fields.create_story.description'))
                ->schema([
                    Components\Repeater::make('edit_core_story')
                        ->label(__('filament-panels::resources/pages/ourgoal.fields.create_story.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/blog.fields.image'))
                                ->image()
                                ->disk('public')
                                ->directory('uploads/productvideo')
                                ->visibility('public')
                                ->maxSize(4096)
                                ->getUploadedFileNameForStorageUsing(function ($file) {
                                    $extension = $file->getClientOriginalExtension();
                                    return Str::uuid() . '.' . $extension;
                                })
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                                ->required(),
                            ]),
                            Components\TextInput::make('youtube_link')
                                ->label(__('filament-panels::resources/pages/ourgoal.fields.create_story.video'))
                                ->required()
                                ->url(),
                        ])
                        ->addActionLabel(__('filament-panels::resources/pages/ourgoal.fields.create_story.add_video'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ])
        ];
    }

    protected function getDefaultCoreStations(): array
    {
        return CoreStation::where('stationable_id', $this->record->id)
            ->where('stationable_type', OurGoal::class) // Assuming you're using a 'type' column to distinguish them
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
        return ProductVideo::where('productvideoable_id', $this->record->id)
            ->where('productvideoable_type', OurGoal::class)
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

        $recordTitle = is_array($record->title) ? $record->title : json_decode($record->title, true);
        $dataSlug = is_array($data['slug'] ?? null) ? $data['slug'] : [];

        // تحديث slug العربي
        if (!empty($data['title']['ar']) && (!isset($recordTitle['ar']) || $data['title']['ar'] !== $recordTitle['ar'])) {
            $dataSlug['ar'] = str_replace(' ', '-', $data['title']['ar']);
        }

        // تحديث slug الإنجليزي
        if (!empty($data['title']['en']) && (!isset($recordTitle['en']) || $data['title']['en'] !== $recordTitle['en'])) {
            $dataSlug['en'] = str_replace(' ', '-', $data['title']['en']);
        }

        $data['slug'] = $dataSlug;


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
            ->where('stationable_type', OurGoal::class)
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
                'stationable_type' => OurGoal::class
            ];

            if (!empty($coreStation['id'])) {
                CoreStation::where('id', $coreStation['id'])->update($dataStation);
            } else {
                CoreStation::create($dataStation);
            }
        }

        // handel core story
        $EditCoreStory = $this->form->getState()['edit_core_story'] ?? [];
        $ExistingIds = ProductVideo::where('productvideoable_id', $this->record->id)
            ->where('productvideoable_type', OurGoal::class)
            ->pluck('id')->toArray();
        $submittedIds = array_filter(array_column($EditCoreStory, 'id'));

        // delete remove useage core story
        $idsStoryToDelete = array_diff($ExistingIds, $submittedIds);
        if (!empty($idsStoryToDelete)) {
            ProductVideo::whereIn('id', $idsStoryToDelete)->delete();
        }

        // create or update core story
        foreach ($EditCoreStory as $corestory) {
            $embedLink = $this->convertToEmbedLink($corestory['youtube_link']);

            if (isset($corestory['id']) && in_array($corestory['id'], $ExistingIds)) {
                ProductVideo::where('id', $corestory['id'])
                    ->update([
                        'image' => $corestory['image'],
                        'youtube_link' => $embedLink,
                        'productvideoable_id' => $this->record->id,
                        'productvideoable_type' => OurGoal::class
                    ]);
            } else {

                ProductVideo::create([
                    'image' => $corestory['image'],
                    'youtube_link' => $embedLink,
                    'productvideoable_id' => $this->record->id,
                    'productvideoable_type' => OurGoal::class
                ]);
            }
        }
    }
}
