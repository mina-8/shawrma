<?php

namespace App\Filament\Resources\OurPromiseResource\Pages;

use App\Filament\Resources\OurPromiseResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOurPromises extends ListRecords
{
    protected static string $resource = OurPromiseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
