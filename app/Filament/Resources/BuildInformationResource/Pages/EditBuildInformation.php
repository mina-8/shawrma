<?php

namespace App\Filament\Resources\BuildInformationResource\Pages;

use App\Filament\Resources\BuildInformationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBuildInformation extends EditRecord
{
    protected static string $resource = BuildInformationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
