<?php

namespace App\Filament\Resources\SettingSiteResource\Pages;

use App\Filament\Resources\SettingSiteResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSettingSites extends ListRecords
{
    protected static string $resource = SettingSiteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
