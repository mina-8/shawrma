<?php

namespace App\Filament\Resources\ProjectLoacationResource\Pages;

use App\Filament\Resources\ProjectLoacationResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProjectLoacations extends ListRecords
{
    protected static string $resource = ProjectLoacationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
