<?php

namespace App\Filament\Resources\SustainabilityResource\Pages;

use App\Filament\Resources\SustainabilityResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSustainabilities extends ListRecords
{
    protected static string $resource = SustainabilityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
