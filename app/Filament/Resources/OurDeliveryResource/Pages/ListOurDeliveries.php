<?php

namespace App\Filament\Resources\OurDeliveryResource\Pages;

use App\Filament\Resources\OurDeliveryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOurDeliveries extends ListRecords
{
    protected static string $resource = OurDeliveryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
