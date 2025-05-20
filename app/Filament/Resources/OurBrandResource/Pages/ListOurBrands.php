<?php

namespace App\Filament\Resources\OurBrandResource\Pages;

use App\Filament\Resources\OurBrandResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOurBrands extends ListRecords
{
    protected static string $resource = OurBrandResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
