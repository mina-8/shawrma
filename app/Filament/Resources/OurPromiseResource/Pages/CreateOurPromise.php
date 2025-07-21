<?php

namespace App\Filament\Resources\OurPromiseResource\Pages;

use App\Filament\Resources\OurPromiseResource;
use App\Models\CoreStation;
use App\Models\CoreStory;
use App\Models\CoreVesion;
use App\Models\OurPromise;
use App\Models\CoreSustainability;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;

class CreateOurPromise extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;
    protected static string $resource = OurPromiseResource::class;
    protected static bool $canCreateAnother = false;
    public function mount(): void
    {
        parent::mount();

        if (OurPromise::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/ourpromise.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/ourpromise.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }

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
                            Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.content')),
                            Components\MarkdownEditor::make('description')
                                ->label(__('filament-panels::resources/pages/ourpromise.fields.description')),
                            Components\MarkdownEditor::make('footer_title')
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
                    Components\Repeater::make('create_core_story')
                        ->label(__('filament-panels::resources/pages/ourpromise.fields.create_story.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_story.title')),
                                // Components\MarkdownEditor::make('content')
                                //     ->label(__('filament-panels::resources/pages/ourpromise.fields.create_story.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/create_story.fields.image'))
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
                    Components\Repeater::make('create_core_sustainability')
                        ->label(__('filament-panels::resources/pages/ourpromise.fields.create_sustainable.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_sustainable.title')),
                                Components\MarkdownEditor::make('content')
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
                    Components\Repeater::make('create_core_vesion')
                        ->label(__('filament-panels::resources/pages/ourpromise.fields.create_vesion.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_vesion.title')),
                                Components\MarkdownEditor::make('content')
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
                    Components\Repeater::make('create_core_station')
                        ->label(__('filament-panels::resources/pages/ourpromise.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourpromise.fields.create_station.title')),
                                Components\MarkdownEditor::make('content')
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

        // create core story
        $CreateCoreStory = $this->form->getState()['create_core_story'] ?? [];

        if (!empty($CreateCoreStory) && $this->record) {
            foreach ($CreateCoreStory as $corestory) {
                CoreStory::create([
                    'title' => $corestory['title'],
                    'image' => $corestory['image'],
                    'storyable_id' => $this->record->id,
                    'storyable_type' => OurPromise::class
                ]);
            }
        }

        // create sustainability
        $CreateCoreSustainability = $this->form->getState()['create_core_sustainability'] ?? [];
        if (!empty($CreateCoreSustainability) && $this->record) {
            foreach ($CreateCoreSustainability as $coresustainble) {
                CoreSustainability::create([
                    'title' => $coresustainble['title'],
                    'content' => $coresustainble['content'],
                    'image' => $coresustainble['image'],
                    'color' => $coresustainble['color'],
                    'sustainable_id' => $this->record->id,
                    'sustainable_type' => OurPromise::class
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
                    'vesionable_type' => OurPromise::class
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
                    'stationable_type' => OurPromise::class
                ]);
            }
        }
    }
}
