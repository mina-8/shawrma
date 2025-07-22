<?php

namespace App\Filament\Resources\SettingSiteResource\Pages;

use App\Filament\Resources\SettingSiteResource;
use App\Models\SettingSite;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;

class CreateSettingSite extends CreateRecord
{
    protected static string $resource = SettingSiteResource::class;

    protected static bool $canCreateAnother = false;
    public function mount(): void
    {
        parent::mount();

        if (SettingSite::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/aboutus.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/aboutus.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }
}
