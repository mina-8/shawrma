<?php

namespace App\Filament\Resources\MainProductResource\Pages;

use App\Filament\Resources\MainProductResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateMainProduct extends CreateRecord
{
    protected static string $resource = MainProductResource::class;

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
