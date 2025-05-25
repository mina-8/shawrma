<?php

namespace App\Filament\Resources\OurCulterResource\Pages;

use App\Filament\Resources\OurCulterResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOurCulters extends ListRecords
{
    protected static string $resource = OurCulterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
