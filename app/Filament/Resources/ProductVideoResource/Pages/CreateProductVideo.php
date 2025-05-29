<?php

namespace App\Filament\Resources\ProductVideoResource\Pages;

use App\Filament\Resources\ProductVideoResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateProductVideo extends CreateRecord
{
    protected static string $resource = ProductVideoResource::class;

    protected function convertToEmbedLink(string $url): string
    {
        if (preg_match('/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/', $url, $match)) {
            return "https://www.youtube.com/embed/{$match[1]}";
        }

        if (preg_match('/(youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/', $url, $match)) {
            return "https://www.youtube.com/embed/{$match[2]}";
        }

        throw \Illuminate\Validation\ValidationException::withMessages([
            'edit_core_story' => ['One or more YouTube URLs are invalid.'],
        ]);
    }
    protected function mutateFormDataBeforeCreate(array $data): array
    {

        $data['youtube_link'] = $this->convertToEmbedLink($data['youtube_link']);

        return $data;
    }
}
