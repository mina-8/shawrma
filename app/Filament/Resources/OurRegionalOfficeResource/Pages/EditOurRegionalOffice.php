<?php

namespace App\Filament\Resources\OurRegionalOfficeResource\Pages;

use App\Filament\Resources\OurRegionalOfficeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditOurRegionalOffice extends EditRecord
{
    protected static string $resource = OurRegionalOfficeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
