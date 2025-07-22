<?php

namespace App\Filament\Resources\OurDeliveryResource\Pages;

use App\Filament\Resources\OurDeliveryResource;
use App\Models\OurDelivery;
use App\Models\CoreStation;
use App\Models\CoreVesion;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;
use Rawilk\FilamentQuill\Filament\Forms\Components\QuillEditor;

class CreateOurDelivery extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;
    protected static string $resource = OurDeliveryResource::class;

    public function mount(): void
    {
        parent::mount();

        if (OurDelivery::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/ourdelivery.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/ourdelivery.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/ourdelivery.fields.header'))
                ->description(__('filament-panels::resources/pages/ourdelivery.fields.description'))
                ->schema([

                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/ourdelivery.fields.title')),
                            QuillEditor::make('content')
                                ->label(__('filament-panels::resources/pages/ourdelivery.fields.content')),
                            Components\TextInput::make('call_us')
                                ->label(__('filament-panels::resources/pages/ourdelivery.fields.title')),
                            Components\TextInput::make('shop_link')
                            ->label(__('filament-panels::resources/pages/ourdelivery.fields.title'))
                            ->default('#'),
                        ]),
                    ]),
                    Components\TextInput::make('phone')
                                ->label(__('filament-panels::resources/pages/ourdelivery.fields.title')),
                ]),

            Step::make(__('filament-panels::resources/pages/ourdelivery.fields.create_vesion.header'))
                ->description(__('filament-panels::resources/pages/ourdelivery.fields.create_vesion.description'))
                ->schema([
                    Components\Repeater::make('create_core_vesion')
                        ->label(__('filament-panels::resources/pages/ourdelivery.fields.create_vesion.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourdelivery.fields.create_vesion.title')),
                                QuillEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/ourdelivery.fields.create_vesion.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/ourdelivery.fields.image'))
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
                        ->addActionLabel(__('filament-panels::resources/pages/ourdelivery.fields.create_station.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),
            Step::make(__('filament-panels::resources/pages/ourdelivery.fields.create_station.header'))
                ->description(__('filament-panels::resources/pages/ourdelivery.fields.create_station.description'))
                ->schema([
                    Components\Repeater::make('create_core_station')
                        ->label(__('filament-panels::resources/pages/ourdelivery.fields.create_station.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/ourdelivery.fields.create_station.title')),
                                QuillEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/ourdelivery.fields.create_station.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/ourdelivery.fields.image'))
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
                        ->addActionLabel(__('filament-panels::resources/pages/ourdelivery.fields.create_station.add_station'))
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
                    'vesionable_type' => OurDelivery::class
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
                    'stationable_type' => OurDelivery::class
                ]);
            }
        }
    }
}
