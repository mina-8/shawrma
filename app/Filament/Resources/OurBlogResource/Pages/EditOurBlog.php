<?php

namespace App\Filament\Resources\OurBlogResource\Pages;

use App\Filament\Resources\OurBlogResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditOurBlog extends EditRecord
{
    protected static string $resource = OurBlogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
