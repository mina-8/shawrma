<?php

namespace App\Filament\Resources\OurBlogResource\Pages;

use App\Filament\Resources\OurBlogResource;
use App\Models\OurBlog;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Redirect;

class CreateOurBlog extends CreateRecord
{
    protected static string $resource = OurBlogResource::class;

    protected static bool $canCreateAnother = false;
    public function mount(): void
    {
        parent::mount();

        if (OurBlog::where('id', 1)->exists()) {
            Notification::make()
                ->title(__('filament-panels::resources/pages/ourstory.Notification.title'))
                ->danger()
                ->body(__('filament-panels::resources/pages/ourstory.Notification.body'))
                ->send();

            Redirect::to(static::$resource::getUrl('index'));
        }
    }

}
