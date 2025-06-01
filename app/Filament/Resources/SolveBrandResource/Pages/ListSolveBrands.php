<?php

namespace App\Filament\Resources\SolveBrandResource\Pages;

use App\Filament\Resources\SolveBrandResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSolveBrands extends ListRecords
{
    protected static string $resource = SolveBrandResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
