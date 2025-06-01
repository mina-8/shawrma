<?php

namespace App\Filament\Resources\OurMainPlairResource\Pages;

use App\Filament\Resources\OurMainPlairResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOurMainPlairs extends ListRecords
{
    protected static string $resource = OurMainPlairResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
