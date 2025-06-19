<?php

namespace App\Filament\Resources\JobAdResource\Pages;

use App\Filament\Resources\JobAdResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListJobAds extends ListRecords
{
    protected static string $resource = JobAdResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
