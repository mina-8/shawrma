<?php

namespace App\Filament\Resources\OurBlogResource\Pages;

use App\Filament\Resources\OurBlogResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOurBlogs extends ListRecords
{
    protected static string $resource = OurBlogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
