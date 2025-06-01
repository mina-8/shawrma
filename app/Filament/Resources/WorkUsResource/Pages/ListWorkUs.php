<?php

namespace App\Filament\Resources\WorkUsResource\Pages;

use App\Filament\Resources\WorkUsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListWorkUs extends ListRecords
{
    protected static string $resource = WorkUsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
