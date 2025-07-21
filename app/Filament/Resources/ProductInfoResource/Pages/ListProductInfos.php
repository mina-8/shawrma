<?php

namespace App\Filament\Resources\ProductInfoResource\Pages;

use App\Filament\Resources\ProductInfoResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProductInfos extends ListRecords
{
    protected static string $resource = ProductInfoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
