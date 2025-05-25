<?php

namespace App\Filament\Resources\FactNumberResource\Pages;

use App\Filament\Resources\FactNumberResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFactNumbers extends ListRecords
{
    protected static string $resource = FactNumberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
