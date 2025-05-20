<?php

namespace App\Filament\Resources\OurGoalResource\Pages;

use App\Filament\Resources\OurGoalResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOurGoals extends ListRecords
{
    protected static string $resource = OurGoalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
