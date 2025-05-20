<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use App\Models\UsageInstruction;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;

class EditProduct extends EditRecord
{
    use EditRecord\Concerns\HasWizard;

    protected static string $resource = ProductResource::class;


    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->requiresConfirmation()
                ->before(function () {
                    $record = $this->record;

                    // Delete associated image
                    if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                        Storage::disk('public')->delete($record->image);
                    }

                    // Delete associated PDF
                    if (!empty($record->pdf) && Storage::disk('public')->exists($record->pdf)) {
                        Storage::disk('public')->delete($record->pdf);
                    }

                    // Delete associated usage instructions
                    UsageInstruction::where('product_id', $record->id)->delete();
                }),
        ];
    }

    protected function getSteps(): array
    {
        return [
            Step::make('product')
                ->description('Product Details')
                ->schema([
                    Components\Group::make([
                        Components\Select::make('mainproduct_id')
                            ->label('Main Product')
                            ->relationship('mainproduct', 'title')
                            ->required(),
                        LanguageTabs::make([
                            Components\TextInput::make('title')
                                ->label(__('filament-panels::resources/pages/product.fields.title'))
                                ->required(),
                                Components\TextInput::make('description')
                                ->label(__('filament-panels::resources/pages/product.fields.product description'))
                                ->required(),
                            Components\MarkdownEditor::make('content')
                                ->label(__('filament-panels::resources/pages/product.fields.content')),
                            Components\MarkdownEditor::make('uses')
                                ->label(__('filament-panels::resources/pages/product.fields.uses')),
                            Components\MarkdownEditor::make('advantages')
                                ->label(__('filament-panels::resources/pages/product.fields.advantages')),

                            Components\Hidden::make('slug')
                                ->label('Slug'),
                        ]),
                    ]),
                    Components\Toggle::make('special')
                        ->label('Special')
                        ->default(0),
                    Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/blog.fields.image'))
                        ->image()
                        ->disk('public')
                        ->directory('uploads/product')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->preserveFilenames()
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                        ->required(),
                    Components\FileUpload::make('pdf')
                        ->label('PDF Document')
                        ->disk('public')
                        ->directory('uploads/pdfproduct')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->preserveFilenames()
                        ->acceptedFileTypes(['application/pdf'])
                        ->required(),
                ]),
            Step::make('Usage Instructions')
                ->description('Product Usage Instructions')
                ->schema([
                    Components\Repeater::make('usage_instructions')
                        ->label('Usage Instructions')
                        ->schema([
                            Components\Hidden::make('id'),
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/blog.fields.title'))
                                    ->required(),
                                Components\MarkdownEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/blog.fields.content')),
                            ])
                        ])
                        ->addActionLabel('Add Usage Instruction')
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required()
                        ->defaultItems(0)


                ]),
        ];
    }

    protected function getDefaultUsageInstructions(): array
    {
        // Load existing usage instructions for the product
        return UsageInstruction::where('product_id', $this->record->id)
            ->get()
            ->map(function($instruction) {
                // Get the raw attributes to ensure we have the actual stored data
                $attributes = $instruction->getAttributes();

                // For Spatie translatable fields, they are stored as JSON in the database
                // but accessed as arrays through the model's accessor
                $title = is_string($attributes['title']) ? json_decode($attributes['title'], true) : $attributes['title'];
                $content = is_string($attributes['content']) ? json_decode($attributes['content'], true) : $attributes['content'];

                return [
                    'id' => $instruction->id,
                    'title' => $title,
                    'content' => $content,
                ];
            })
            ->toArray();
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $data['usage_instructions'] = $this->getDefaultUsageInstructions();
        return $data;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $record = $this->record;

        // Handle image file replacement
        if (isset($data['image']) && $data['image'] !== $record->image) {
            if (!empty($record->image) && Storage::disk('public')->exists($record->image)) {
                Storage::disk('public')->delete($record->image);
            }
        }

        // Handle PDF file replacement
        if (isset($data['pdf']) && $data['pdf'] !== $record->pdf) {
            if (!empty($record->pdf) && Storage::disk('public')->exists($record->pdf)) {
                Storage::disk('public')->delete($record->pdf);
            }
        }

        // Generate slugs for updated titles
        if (!empty($data['title']['ar'])) {
            $data['slug']['ar'] = str_replace(' ', '-', $data['title']['ar']);
        }

        if (!empty($data['title']['en'])) {
            $data['slug']['en'] = str_replace(' ', '-', $data['title']['en']);
        }


        return $data;
    }

    protected function afterSave(): void
    {
        // Handle usage instructions
        $usageInstructions = $this->form->getState()['usage_instructions'] ?? [];
        $existingIds = UsageInstruction::where('product_id', $this->record->id)->pluck('id')->toArray();
        $submittedIds = array_filter(array_column($usageInstructions, 'id'));

        // Delete removed usage instructions
        $idsToDelete = array_diff($existingIds, $submittedIds);
        if (!empty($idsToDelete)) {
            UsageInstruction::whereIn('id', $idsToDelete)->delete();
        }

        // Create or update usage instructions
        foreach ($usageInstructions as $instruction) {
            $data = [
                'product_id' => $this->record->id,
                'title' => $instruction['title'],
                'content' => $instruction['content'],
            ];

            if (isset($instruction['id']) && in_array($instruction['id'], $existingIds)) {
                // Update existing instruction
                UsageInstruction::where('id', $instruction['id'])->update($data);
            } else {
                // Create new instruction
                UsageInstruction::create($data);
            }
        }
    }
}
