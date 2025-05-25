<?php

namespace App\Filament\Resources\ProductVideoResource\Pages;

use App\Filament\Resources\ProductVideoResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProductVideos extends ListRecords
{
    protected static string $resource = ProductVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
