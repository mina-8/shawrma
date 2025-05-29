<?php

namespace App\Filament\Resources\ProjectLoacationResource\Pages;

use App\Filament\Resources\ProjectLoacationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProjectLoacation extends EditRecord
{
    protected static string $resource = ProjectLoacationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
