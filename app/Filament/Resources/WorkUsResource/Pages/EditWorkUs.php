<?php

namespace App\Filament\Resources\WorkUsResource\Pages;

use App\Filament\Resources\WorkUsResource;
use App\Models\CoreStation;
use App\Models\CoreVesion;
use App\Models\WorkAd;
use App\Models\WorkUs;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;
use Rawilk\FilamentQuill\Filament\Forms\Components\QuillEditor;
class EditWorkUs extends EditRecord
{
    use EditRecord\Concerns\HasWizard;
    protected static string $resource = WorkUsResource::class;

    // protected function getHeaderActions(): array
    // {
    //     return [
    //         Actions\DeleteAction::make(),
    //     ];
    // }

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/workus.fields.header'))
                ->description(__('filament-panels::resources/pages/workus.fields.description'))
                ->schema([

                    Components\Group::make([
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/workus.fields.title'))
                                ->required(),

                            QuillEditor::make('content')
                                ->label(__('filament-panels::resources/pages/workus.fields.content'))
                                ->required(),

                            Components\TextInput::make('content_title')
                                ->label(__('filament-panels::resources/pages/workus.fields.content_title'))
                                ->required(),

                            QuillEditor::make('footer_content')
                                ->label(__('filament-panels::resources/pages/workus.fields.footer_content'))
                                ->required(),


                        ]),
                        Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/workus.fields.image'))
                        ->disk('public')
                        ->directory('uploads/workus')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']),
                    ]),

                ]),
            Step::make(__('filament-panels::resources/pages/workus.fields.create_vesion.header'))
                ->description(__('filament-panels::resources/pages/workus.fields.create_vesion.description'))
                ->schema([
                    Components\Repeater::make('edit_core_vesion')
                        ->label(__('filament-panels::resources/pages/workus.fields.create_vesion.description'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/workus.fields.create_vesion.title')),
                                QuillEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/workus.fields.create_vesion.content')),
                            ]),
                            Components\FileUpload::make('image')
                                ->label(__('filament-panels::resources/pages/workus.fields.image'))
                                ->disk('public')
                                ->directory('uploads/vesion')
                                ->visibility('public')
                                ->maxSize(4096)
                                ->getUploadedFileNameForStorageUsing(function ($file) {
                                    $extension = $file->getClientOriginalExtension();
                                    return Str::uuid() . '.' . $extension;
                                })
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                                ->required(),
                        ])
                        ->addActionLabel(__('filament-panels::resources/pages/workus.fields.create_vesion.add_station'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),


        ];
    }

    protected function getDefaultCoreVesion(): array
    {
        return CoreVesion::where('vesionable_id', $this->record->id)
            ->where('vesionable_type', WorkUs::class)
            ->get()
            ->map(function ($vesions) {
                $title = $vesions->getTranslations('title');
                $content = $vesions->getTranslations('content');
                return [
                    'id' => $vesions->id,
                    'title' => $title,
                    'content' => $content,
                    'image' => $vesions->image,
                ];
            })->toArray();
    }



    protected function mutateFormDataBeforeFill(array $data): array
    {
        $data['edit_core_vesion'] = $this->getDefaultCoreVesion();
        return $data;
    }
    protected function mutateFormDataBeforeSave(array $data): array
    {

        $record = $this->record;

        // Handle banner file replacement
        if (isset($data['banner']) && $data['banner'] !== $record->banner) {
            if (!empty($record->banner) && Storage::disk('public')->exists($record->banner)) {
                Storage::disk('public')->delete($record->banner);
            }
        }


        return $data;
    }
    protected function afterSave(): void
    {

        // handel core vesion
        $EditCoreVesion = $this->form->getState()['edit_core_vesion'] ?? [];
        $ExistCoreVesion = CoreVesion::where('vesionable_id', $this->record->id)
            ->where('vesionable_type', WorkUs::class)
            ->pluck('id')->toArray();
        $SubmitedVesionId = array_filter(array_column($EditCoreVesion, 'id'));

        // Identify and delete removed stations (including their images)
        foreach ($ExistCoreVesion as $deletevesionId) {
            if (!in_array($deletevesionId, $SubmitedVesionId)) {
                $deletevesion = CoreVesion::find($deletevesionId);

                if ($deletevesion && !empty($deletevesion->image) && Storage::disk('public')->exists($deletevesion->image)) {
                    Storage::disk('public')->delete($deletevesion->image);
                }

                $deletevesion?->delete();
            }
        }


        foreach ($EditCoreVesion as $corevesion) {
            $dataVesion = [
                'title' => $corevesion['title'],
                'content' => $corevesion['content'],
                'image' => $corevesion['image'],
                'vesionable_id' => $this->record->id,
                'vesionable_type' => WorkUs::class
            ];

            if (!empty($corevesion['id'])) {
                CoreVesion::where('id', $corevesion['id'])->update($dataVesion);
            } else {
                CoreVesion::create($dataVesion);
            }
        }



    }
}
