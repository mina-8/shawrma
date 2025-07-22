<?php

namespace App\Filament\Resources\OurPromiseResource\Pages;

use App\Filament\Resources\OurPromiseResource;
use App\Models\OurPromise;
use App\Models\CoreVesion;
use App\Models\CoreStation;
use App\Models\CoreStory;
use App\Models\CoreSustainability;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Rawilk\FilamentQuill\Filament\Forms\Components\QuillEditor;
class EditOurPromise extends EditRecord
{
    use EditRecord\Concerns\HasWizard;
    protected static string $resource = OurPromiseResource::class;

    // protected function getHeaderActions(): array
    // {
    //     return [
    //         Actions\DeleteAction::make(),
    //     ];
    // }

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/ourpromise.fields.header'))
                ->description(__('filament-panels::resources/pages/ourpromise.fields.description'))
                ->schema([

                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.title')),

                            QuillEditor::make('content')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.content')),
                            QuillEditor::make('description')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.description')),
                            QuillEditor::make('footer_title')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.footer_title')),


                            Components\Hidden::make('slug')
                                ->label('Slug'),
                        ]),
                    ]),
                    Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/ourpromise.fields.image'))
                        ->disk('public')
                        ->directory('uploads/aboutus')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']),
                ]),
            Step::make(__('filament-panels::resources/pages/ourpromise.fields.create_story.header'))
                ->description(__('filament-panels::resources/pages/ourpromise.fields.create_story.description'))
                ->schema([
                    Components\Repeater::make('edit_core_story')
                        ->label(__('filament-panels::resources/pages/ourpromise.fields.create_story.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_story.title')),
                                // Components\MarkdownEditor::make('content')
                                //     ->label(__('filament-panels::resources/pages/ourpromise.fields.create_story.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.create_story.image'))
                                ->disk('public')
                                ->directory('uploads/vesion')
                                ->visibility('public')
                                ->maxSize(4096)
                                ->getUploadedFileNameForStorageUsing(function ($file) {
                                    $extension = $file->getClientOriginalExtension();
                                    return Str::uuid() . '.' . $extension;
                                })
                                ->acceptedFileTypes(['application/pdf'])
                                ->required(),
                        ])
                        ->addActionLabel(__('filament-panels::resources/pages/ourpromise.fields.create_story.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),
                Step::make(__('filament-panels::resources/pages/ourpromise.fields.create_sustainable.header'))
                ->description(__('filament-panels::resources/pages/ourpromise.fields.create_sustainable.description'))
                ->schema([
                    Components\Repeater::make('edit_core_sustainability')
                        ->label(__('filament-panels::resources/pages/ourpromise.fields.create_sustainable.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_sustainable.title')),
                                QuillEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_sustainable.content')),
                            ]),
                            Components\ColorPicker::make('color'),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.image'))
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
                        ->addActionLabel(__('filament-panels::resources/pages/ourpromise.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),
            Step::make(__('filament-panels::resources/pages/ourpromise.fields.create_vesion.header'))
                ->description(__('filament-panels::resources/pages/ourpromise.fields.create_vesion.description'))
                ->schema([
                    Components\Repeater::make('edit_core_vesion')
                        ->label(__('filament-panels::resources/pages/ourpromise.fields.create_vesion.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_vesion.title')),
                                QuillEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_vesion.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.image'))
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
                        ->addActionLabel(__('filament-panels::resources/pages/ourpromise.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),
            Step::make(__('filament-panels::resources/pages/ourpromise.fields.create_station.header'))
                ->description(__('filament-panels::resources/pages/ourpromise.fields.create_station.description'))
                ->schema([
                    Components\Repeater::make('edit_core_station')
                        ->label(__('filament-panels::resources/pages/ourpromise.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_station.title')),
                                QuillEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_station.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.image'))
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
                        ->addActionLabel(__('filament-panels::resources/pages/ourpromise.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),

        ];
    }

    protected function getDefaultCoreStory(): array
    {
        // Load existing usage instructions for the product
        return CoreStory::where('storyable_id', $this->record->id)
            ->where('storyable_type', OurPromise::class)
            ->get()
            ->map(function ($corstory) {

                $title = $corstory->getTranslations('title');
                return [
                    'id' => $corstory->id,
                    'title' => $title,
                    'image' => $corstory->image
                ];
            })
            ->toArray();
    }

    protected function getDefaultCoreSustainability():array
    {
        return CoreSustainability::where('sustainable_id' , $this->record->id)
        ->where('sustainable_type' , OurPromise::class)
        ->get()
        ->map(function ($sustainabil){
            $title = $sustainabil->getTranslations('title');
            $content = $sustainabil->getTranslations('content');
            return [
                'id' => $sustainabil->id,
                'title' => $title,
                'content' => $content,
                'color' => $sustainabil->color,
                'image' => $sustainabil->image
            ];
        })->toArray();
    }
    protected function getDefaultCoreVesion(): array
    {
        return CoreVesion::where('vesionable_id', $this->record->id)
            ->where('vesionable_type', OurPromise::class)
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
            ->where('stationable_type', OurPromise::class) // Assuming you're using a 'type' column to distinguish them
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
        $data['edit_core_story'] = $this->getDefaultCoreStory();
        $data['edit_core_sustainability'] = $this->getDefaultCoreSustainability();
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

    protected function corestory(){
        // handel core story
        $EditCoreStory = $this->form->getState()['edit_core_story'] ?? [];
        $ExistingIds = CoreStory::where('storyable_id', $this->record->id)
            ->where('storyable_type', OurPromise::class)
            ->pluck('id')->toArray();
        $submittedIds = array_filter(array_column($EditCoreStory, 'id'));

        // delete remove useage core story
        foreach($ExistingIds as $deletestory){
            if(!in_array($deletestory , $submittedIds)){
                $deleteId = CoreStory::find($deletestory);

                if($deleteId && !empty($deleteId->image) && Storage::disk('public')->exists($deleteId->image)){
                    Storage::disk('public')->delete($deleteId->image);
                }

                $deleteId?->delete();
            }
        }

        // create or update core story
        foreach ($EditCoreStory as $corestory) {

            if (isset($corestory['id']) && in_array($corestory['id'], $ExistingIds)) {
                CoreStory::where('id', $corestory['id'])
                    ->update([
                        'title' => $corestory['title'],
                        'image' => $corestory['image'],
                        'storyable_id' => $this->record->id,
                        'storyable_type' => OurPromise::class
                    ]);
            } else {

                CoreStory::create([
                    'title' => $corestory['title'],
                    'image' => $corestory['image'],
                    'storyable_id' => $this->record->id,
                    'storyable_type' => OurPromise::class
                ]);
            }
        }
    }

    protected function coresustainability(){
        $EditCoreSustainability = $this->form->getState()['edit_core_sustainability'] ?? [];
        $ExistCoreSustainabillity = CoreSustainability::where('sustainable_id' , $this->record->id)
        ->where('sustainable_type' , OurPromise::class)
        ->pluck('id')->toArray();
        $SubmitedSustainability = array_filter(array_column($EditCoreSustainability , 'id'));

        // Identify and delete removed stations (including their images)
        foreach($ExistCoreSustainabillity as $deletedId){
            if(!in_array($deletedId , $SubmitedSustainability)){
                $deletedSustainabilID = CoreSustainability::find($deletedId);

                if($deletedSustainabilID && !empty($deletedSustainabilID->image) && Storage::disk('public')->exists($deletedSustainabilID->image)){
                    Storage::disk('public')->delete($deletedSustainabilID->image);
                }

                $deletedSustainabilID->delete();
            }
        }

        foreach($EditCoreSustainability as $coresustainbility){
            $dataSustainability = [
                'title' => $coresustainbility['title'],
                'content' => $coresustainbility['content'],
                'image' => $coresustainbility['image'],
                'color' => $coresustainbility['color'],
                'sustainable_id' => $this->record->id,
                'sustainable_type' => OurPromise::class
            ];

            if(!empty($coresustainbility['id'])){
                CoreSustainability::where('id' , $coresustainbility['id'])->update($dataSustainability);
            }else{
                CoreSustainability::create($dataSustainability);
            }
        }
    }

    protected function afterSave(): void
    {

        // handel core story
        $this->corestory();

        // handel core sustainability
        $this->coresustainability();

        // handel core vesion
        $EditCoreVesion = $this->form->getState()['edit_core_vesion'] ?? [];
        $ExistCoreVesion = CoreVesion::where('vesionable_id', $this->record->id)
            ->where('vesionable_type', OurPromise::class)
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
                'vesionable_type' => OurPromise::class
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
            ->where('stationable_type', OurPromise::class)
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
                'stationable_type' => OurPromise::class
            ];

            if (!empty($coreStation['id'])) {
                CoreStation::where('id', $coreStation['id'])->update($dataStation);
            } else {
                CoreStation::create($dataStation);
            }
        }


    }
}
