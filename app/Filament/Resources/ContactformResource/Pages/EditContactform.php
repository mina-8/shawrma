<?php

namespace App\Filament\Resources\ContactformResource\Pages;

use App\Filament\Resources\ContactformResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditContactform extends EditRecord
{
    protected static string $resource = ContactformResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
