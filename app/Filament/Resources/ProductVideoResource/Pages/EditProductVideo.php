<?php

namespace App\Filament\Resources\ProductVideoResource\Pages;

use App\Filament\Resources\ProductVideoResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProductVideo extends EditRecord
{
    protected static string $resource = ProductVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
