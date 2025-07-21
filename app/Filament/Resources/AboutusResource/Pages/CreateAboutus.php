<?php

namespace App\Filament\Resources\AboutusResource\Pages;

use App\Filament\Resources\AboutusResource;
use App\Models\CoreStation;
use App\Models\CoreStory;
use App\Models\CoreVesion;
use App\Models\Aboutus;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;

class CreateAboutus extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;
    protected static string $resource = AboutusResource::class;
    protected static bool $canCreateAnother = false;

    public function mount(): void
    {
        parent::mount();

        if (Aboutus::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/aboutus.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/aboutus.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }

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


                            Components\MarkdownEditor::make('content')
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
                    Components\Repeater::make('create_core_stories')
                        ->label(__('filament-panels::resources/pages/aboutus.fields.create_stories.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/aboutus.fields.create_stories.title')),
                                Components\MarkdownEditor::make('content')
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
                    Components\Repeater::make('create_core_vesion')
                        ->label(__('filament-panels::resources/pages/aboutus.fields.create_vesion.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/aboutus.fields.create_vesion.title')),
                                Components\MarkdownEditor::make('content')
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

        if (!empty($data['title']['ar'])) {
            $data['slug']['ar'] = str_replace(' ', '-', $data['title']['ar']);
        }

        if (!empty($data['title']['en'])) {
            $data['slug']['en'] = str_replace(' ', '-', $data['title']['en']);
        }

        return $data;
    }

    protected function afterCreate(): void
    {
        // create core stories
        $CreateCoreStories  = $this->form->getState()['create_core_stories'] ?? [];
        if (!empty($CreateCoreStories) && $this->record) {
            foreach ($CreateCoreStories as $corestory) {
                CoreStory::create([
                    'title' => $corestory['title'],
                    'content' => $corestory['content'],
                    'image' => $corestory['image'],
                    'storyable_id' => $this->record->id,
                    'storyable_type' => Aboutus::class
                ]);
            }
        }

        // create core vesion
        $CreateCoreVesion  = $this->form->getState()['create_core_vesion'] ?? [];
        if (!empty($CreateCoreVesion) && $this->record) {
            foreach ($CreateCoreVesion as $corevesion) {
                CoreVesion::create([
                    'title' => $corevesion['title'],
                    'content' => $corevesion['content'],
                    'image' => $corevesion['image'],
                    'vesionable_id' => $this->record->id,
                    'vesionable_type' => Aboutus::class
                ]);
            }
        }
        // create core station
        $CreateCoreStation = $this->form->getState()['create_core_station'] ?? [];
        if (!empty($CreateCoreStation) && $this->record) {
            foreach ($CreateCoreStation as $corestation) {
                CoreStation::create([
                    'title' => $corestation['title'],
                    'content' => $corestation['content'],
                    'image' => $corestation['image'],
                    'stationable_id' => $this->record->id,
                    'stationable_type' => Aboutus::class
                ]);
            }
        }
    }
}
