<?php

namespace App\Filament\Resources\AboutusResource\Pages;

use App\Filament\Resources\AboutusResource;
use App\Models\CoreStation;
use App\Models\CoreStory;
use App\Models\CoreVesion;
use App\Models\Aboutus;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Rawilk\FilamentQuill\Filament\Forms\Components\QuillEditor;
class EditAboutus extends EditRecord
{
    use EditRecord\Concerns\HasWizard;
    protected static string $resource = AboutusResource::class;

    // protected function getHeaderActions(): array
    // {
    //     return [
    //         Actions\DeleteAction::make(),
    //     ];
    // }

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/aboutus.fields.header'))
                ->description(__('filament-panels::resources/pages/aboutus.fields.description'))
                ->schema([

                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/aboutus.fields.title'))
                                ->required(),

                            QuillEditor::make('content')
                                ->label(__('filament-panels::resources/pages/aboutus.fields.content')),


                            Components\Hidden::make('slug')
                                ->label('Slug'),
                        ]),
                    ]),
                    Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/aboutus.fields.image'))
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
            Step::make(__('filament-panels::resources/pages/aboutus.fields.create_stories.header'))
                ->description(__('filament-panels::resources/pages/aboutus.fields.create_stories.description'))
                ->schema([
                    Components\Repeater::make('edit_core_stories')
                        ->label(__('filament-panels::resources/pages/aboutus.fields.create_stories.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/aboutus.fields.create_stories.title')),
                                QuillEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/aboutus.fields.create_stories.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/aboutus.fields.image'))
                                ->disk('public')
                                ->directory('uploads/vesion')
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
            Step::make(__('filament-panels::resources/pages/aboutus.fields.create_vesion.header'))
                ->description(__('filament-panels::resources/pages/aboutus.fields.create_vesion.description'))
                ->schema([
                    Components\Repeater::make('edit_core_vesion')
                        ->label(__('filament-panels::resources/pages/aboutus.fields.create_vesion.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/aboutus.fields.create_vesion.title')),
                                QuillEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/aboutus.fields.create_vesion.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/aboutus.fields.image'))
                                ->disk('public')
                                ->directory('uploads/vesion')
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
            Step::make(__('filament-panels::resources/pages/aboutus.fields.create_station.header'))
                ->description(__('filament-panels::resources/pages/aboutus.fields.create_station.description'))
                ->schema([
                    Components\Repeater::make('edit_core_station')
                        ->label(__('filament-panels::resources/pages/aboutus.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/aboutus.fields.create_station.title')),
                                QuillEditor::make('content')
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
    protected function getDefaultCoreStories(): array
    {
        return CoreStory::where('storyable_id', $this->record->id)
            ->where('storyable_type', Aboutus::class)
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

    protected function getDefaultCoreVesion(): array
    {
        return CoreVesion::where('vesionable_id', $this->record->id)
            ->where('vesionable_type', Aboutus::class)
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
            ->where('stationable_type', Aboutus::class) // Assuming you're using a 'type' column to distinguish them
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
        $data['edit_core_stories'] = $this->getDefaultCoreStories();
        $data['edit_core_vesion'] = $this->getDefaultCoreVesion();
        $data['edit_core_station'] = $this->getDefaultCoreStations();
        return $data;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {

        $record = $this->record;

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

    protected function afterSave(): void
    {

        // handel core stories
        $EditCoreStories = $this->form->getState()['edit_core_stories'] ?? [];
        $ExistCoreStories = CoreStory::where('storyable_id' , $this->record->id)
        ->where('storyable_type' , Aboutus::class)
        ->pluck('id')->toArray();
        $SubmitedStoryid = array_filter(array_column($EditCoreStories , 'id'));
        foreach($ExistCoreStories as $deletestoryid){
            if(!in_array($deletestoryid , $SubmitedStoryid)){
                $deletedStory = CoreStory::find($deletestoryid);

                if($deletedStory && !empty($deletedStory->image) && Storage::disk('public')->exists($deletedStory->image)){
                    Storage::disk('public')->delete($deletedStory->image);
                }

                $deletedStory->delete();
            }
        }

        foreach($EditCoreStories as $corestory){
            $dataStory = [
                'title' => $corestory['title'],
                'content' => $corestory['content'],
                'image' => $corestory['image'],
                'storyable_id' => $this->record->id,
                'storyable_type' => Aboutus::class
            ];

            if(!empty($corestory['id'])){
                CoreStory::where('id' , $corestory['id'])
                ->update($dataStory);
            }else{
                CoreStory::create($dataStory);
            }
        }

        // handel core vesion
        $EditCoreVesion = $this->form->getState()['edit_core_vesion'] ?? [];
        $ExistCoreVesion = CoreVesion::where('vesionable_id', $this->record->id)
            ->where('vesionable_type', Aboutus::class)
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
                'vesionable_type' => Aboutus::class
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
            ->where('stationable_type', Aboutus::class)
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
                'stationable_type' => Aboutus::class
            ];

            if (!empty($coreStation['id'])) {
                CoreStation::where('id', $coreStation['id'])->update($dataStation);
            } else {
                CoreStation::create($dataStation);
            }
        }
    }
}
