<?php

namespace App\Filament\Resources\BranshResource\Pages;

use App\Filament\Resources\BranshResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;
class EditBransh extends EditRecord
{
    protected static string $resource = BranshResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
            ->requiresConfirmation()
                ->before(function () {
                    $record = $this->record;
                    if (!empty($record->video) && Storage::disk('public')->exists($record->video)) {
                        Storage::disk('public')->delete($record->video);
                    }
                }),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $record = $this->record;


        if (isset($data['video']) && $data['video'] !== $record->video) {
            // Delete the old image if it exists
            if (!empty($record->image) && Storage::disk('public')->exists($record->video)) {
                Storage::disk('public')->delete($record->video);
            }
        }


        return $data;
    }
}
