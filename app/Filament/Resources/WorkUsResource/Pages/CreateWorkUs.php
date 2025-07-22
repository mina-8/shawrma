<?php

namespace App\Filament\Resources\WorkUsResource\Pages;

use App\Filament\Resources\WorkUsResource;
use App\Models\CoreStation;
use App\Models\CoreVesion;
use App\Models\WorkAd;
use App\Models\WorkUs;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;
use Rawilk\FilamentQuill\Filament\Forms\Components\QuillEditor;
class CreateWorkUs extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;
    protected static string $resource = WorkUsResource::class;

    public function mount(): void
    {
        parent::mount();

        if (WorkUs::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/workus.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/workus.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/workus.fields.header'))
                ->description(__('filament-panels::resources/pages/workus.fields.description'))
                ->schema([

                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/workus.fields.title'))
                                ->required(),

                            QuillEditor::make('content')
                                ->label(__('filament-panels::resources/pages/workus.fields.content'))
                                ->required(),

                            Components\TextInput::make('content_title')
                                ->label(__('filament-panels::resources/pages/workus.fields.content_title'))
                                ->required(),

                            QuillEditor::make('footer_content')
                                ->label(__('filament-panels::resources/pages/workus.fields.footer_content'))
                                ->required(),

                        ]),
                        Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/workus.fields.image'))
                        ->disk('public')
                        ->directory('uploads/workus')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']),
                    ]),


                ]),
            Step::make(__('filament-panels::resources/pages/workus.fields.create_vesion.header'))
                ->description(__('filament-panels::resources/pages/workus.fields.create_vesion.description'))
                ->schema([
                    Components\Repeater::make('create_core_vesion')
                        ->label(__('filament-panels::resources/pages/workus.fields.create_vesion.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/workus.fields.create_vesion.title')),
                                QuillEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/workus.fields.create_vesion.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/workus.fields.image'))
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
                        ->addActionLabel(__('filament-panels::resources/pages/workus.fields.create_vesion.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),


        ];
    }

    protected function afterCreate(): void
    {
        // create core vesion
        $CreateCoreVesion  = $this->form->getState()['create_core_vesion'] ?? [];
        if (!empty($CreateCoreVesion) && $this->record) {
            foreach ($CreateCoreVesion as $corevesion) {
                CoreVesion::create([
                    'title' => $corevesion['title'],
                    'content' => $corevesion['content'],
                    'image' => $corevesion['image'],
                    'vesionable_id' => $this->record->id,
                    'vesionable_type' => WorkUs::class
                ]);
            }
        }

    }
}
