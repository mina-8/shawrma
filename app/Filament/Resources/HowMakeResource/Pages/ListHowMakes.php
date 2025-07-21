<?php

namespace App\Filament\Resources\HowMakeResource\Pages;

use App\Filament\Resources\HowMakeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListHowMakes extends ListRecords
{
    protected static string $resource = HowMakeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
