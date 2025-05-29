<?php

namespace App\Filament\Resources\ProductVideoResource\Pages;

use App\Filament\Resources\ProductVideoResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditProductVideo extends EditRecord
{
    protected static string $resource = ProductVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->requiresConfirmation()
                ->before(function () {
                    $record = $this->record;

                    // Delete associated image
                    if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                        Storage::disk('public')->delete($record->image);
                    }

                }),
        ];
    }

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

    protected function mutateFormDataBeforeSave(array $data): array
    {

        $record = $this->record;


        // Handle image file replacement
        if (isset($data['image']) && $data['image'] !== $record->image) {
            if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                Storage::disk('public')->delete($record->image);
            }
        }

        $data['youtube_link'] = $this->convertToEmbedLink($data['youtube_link']);


        return $data;
    }
}
