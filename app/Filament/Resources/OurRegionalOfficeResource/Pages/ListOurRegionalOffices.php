<?php

namespace App\Filament\Resources\OurRegionalOfficeResource\Pages;

use App\Filament\Resources\OurRegionalOfficeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOurRegionalOffices extends ListRecords
{
    protected static string $resource = OurRegionalOfficeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
