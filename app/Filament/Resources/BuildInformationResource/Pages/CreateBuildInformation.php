<?php

namespace App\Filament\Resources\BuildInformationResource\Pages;

use App\Filament\Resources\BuildInformationResource;
use App\Models\BuildInformation;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;
class CreateBuildInformation extends CreateRecord
{
    protected static string $resource = BuildInformationResource::class;

    public function mount(): void
    {
        parent::mount();

        if (BuildInformation::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/ourculter.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/ourculter.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }
}
