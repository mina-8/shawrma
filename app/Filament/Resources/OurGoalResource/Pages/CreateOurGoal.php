<?php

namespace App\Filament\Resources\OurGoalResource\Pages;

use App\Filament\Resources\OurGoalResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateOurGoal extends CreateRecord
{
    protected static string $resource = OurGoalResource::class;
    protected function mutateFormDataBeforeCreate(array $data): array
    {

        if (!empty($data['title']['ar'])) {
            $data['slug']['ar'] = str_replace(' ', '-', $data['title']['ar']);
        }

        if (!empty($data['title']['en'])) {
            $data['slug']['en'] = str_replace(' ', '-', $data['title']['en']);
        }

        return $data;
    }
}
