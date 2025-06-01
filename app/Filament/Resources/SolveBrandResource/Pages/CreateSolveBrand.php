<?php

namespace App\Filament\Resources\SolveBrandResource\Pages;

use App\Filament\Resources\SolveBrandResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateSolveBrand extends CreateRecord
{
    protected static string $resource = SolveBrandResource::class;

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
