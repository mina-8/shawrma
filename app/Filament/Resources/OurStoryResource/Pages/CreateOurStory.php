<?php

namespace App\Filament\Resources\OurStoryResource\Pages;

use App\Filament\Resources\OurStoryResource;
use App\Models\CoreStation;
use App\Models\CoreStory;
use App\Models\OurStory;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;
use Rawilk\FilamentQuill\Filament\Forms\Components\QuillEditor;
class CreateOurStory extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;

    protected static bool $canCreateAnother = false;
    protected static string $resource = OurStoryResource::class;

    public function mount(): void
    {
        parent::mount();

        if (OurStory::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/ourstory.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/ourstory.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/ourstory.fields.header'))
                ->description(__('filament-panels::resources/pages/ourstory.fields.description'))
                ->schema([

                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/ourstory.fields.title'))
                                ->required(),

                            QuillEditor::make('content')
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
                    Components\Repeater::make('create_core_station')
                        ->label(__('filament-panels::resources/pages/ourstory.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourstory.fields.create_station.title')),
                                QuillEditor::make('content')
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
        // create core station
        $CreateCoreStation = $this->form->getState()['create_core_station'] ?? [];
        if (!empty($CreateCoreStation) && $this->record) {
            foreach ($CreateCoreStation as $corestation) {
                CoreStation::create([
                    'title' => $corestation['title'],
                    'content' => $corestation['content'],
                    'image' => $corestation['image'],
                    'stationable_id' => $this->record->id,
                    'stationable_type' => OurStory::class
                ]);
            }
        }

    }
}
