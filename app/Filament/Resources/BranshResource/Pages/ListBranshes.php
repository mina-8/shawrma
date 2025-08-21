<?php

namespace App\Filament\Resources\BranshResource\Pages;

use App\Filament\Resources\BranshResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBranshes extends ListRecords
{
    protected static string $resource = BranshResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
