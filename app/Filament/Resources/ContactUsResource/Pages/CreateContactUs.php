<?php

namespace App\Filament\Resources\ContactUsResource\Pages;

use App\Filament\Resources\ContactUsResource;
use App\Models\ContactUs;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;
class CreateContactUs extends CreateRecord
{
    protected static string $resource = ContactUsResource::class;


    protected static bool $canCreateAnother = false;
    public function mount(): void
    {
        parent::mount();

        if (ContactUs::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/ourstory.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/ourstory.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }
}
