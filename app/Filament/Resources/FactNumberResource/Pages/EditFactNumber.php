<?php

namespace App\Filament\Resources\FactNumberResource\Pages;

use App\Filament\Resources\FactNumberResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditFactNumber extends EditRecord
{
    protected static string $resource = FactNumberResource::class;


    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->requiresConfirmation()
                ->before(function () {
                    $record = $this->record;
                    if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                        Storage::disk('public')->delete($record->image);
                    }
                }),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $record = $this->record;

        if (isset($data['image']) && $data['image'] !== $record->image) {
            // Delete the old image if it exists
            if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                Storage::disk('public')->delete($record->image);
            }
        }

        return $data;
    }
}
