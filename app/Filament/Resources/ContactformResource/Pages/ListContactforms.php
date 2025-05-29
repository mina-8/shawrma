<?php

namespace App\Filament\Resources\ContactformResource\Pages;

use App\Filament\Resources\ContactformResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListContactforms extends ListRecords
{
    protected static string $resource = ContactformResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
