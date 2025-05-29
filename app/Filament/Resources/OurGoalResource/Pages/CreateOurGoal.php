<?php

namespace App\Filament\Resources\OurGoalResource\Pages;

use App\Filament\Resources\OurGoalResource;
use App\Models\OurGoal;
use App\Models\CoreStation;
use App\Models\ProductVideo;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;

class CreateOurGoal extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;
    protected static string $resource = OurGoalResource::class;

    public function mount(): void
    {
        parent::mount();

        if (OurGoal::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/ourgoal.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/ourgoal.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }

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
                    Components\Repeater::make('create_core_station')
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
                    Components\Repeater::make('create_core_story')
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
        if(!empty($CreateCoreStation) && $this->record){
        foreach($CreateCoreStation as $corestation){
            CoreStation::create([
                'title'=> $corestation['title'],
                'content' => $corestation['content'],
                'image' => $corestation['image'],
                'stationable_id' => $this->record->id,
                'stationable_type' => OurGoal::class
            ]);
        }
        }
        // create core story
        $CreateProductvideo = $this->form->getState()['create_core_story'] ?? [];

        if (!empty($CreateProductvideo) && $this->record) {
            foreach ($CreateProductvideo as $corestory) {

                $youtubeLink = $corestory['youtube_link'];

                if (preg_match('/(youtu\.be\/|youtube\.com\/(watch\?v=|embed\/))([a-zA-Z0-9_-]+)/', $youtubeLink, $matches)) {
                    $videoId = $matches[3];
                    $embedLink = "https://www.youtube.com/embed/{$videoId}";
                } else {
                    throw \Illuminate\Validation\ValidationException::withMessages([
                        'create_core_story' => ['One or more YouTube URLs are invalid.'],
                    ]);
                }

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
