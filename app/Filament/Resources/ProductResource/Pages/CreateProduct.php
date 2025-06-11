<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use App\Models\UsageInstruction;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components;
use Illuminate\Support\Str;
use Pixelpeter\FilamentLanguageTabs\Forms\Components\LanguageTabs;

class CreateProduct extends CreateRecord
{
    use CreateRecord\Concerns\HasWizard;

    protected static string $resource = ProductResource::class;

    protected function getSteps(): array
    {
        return [
            Step::make(__('filament-panels::resources/pages/product.fields.header'))
                ->description(__('filament-panels::resources/pages/product.fields.description'))
                ->schema([
                    Components\Group::make([
                        Components\Select::make('mainproduct_id')
                            ->label(__('filament-panels::resources/pages/product.fields.mainproduct'))
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
                        ->label(__('filament-panels::resources/pages/product.fields.special'))
                        ->default(0),
                    Components\TextInput::make('color')
                        ->label(__('filament-panels::resources/pages/product.fields.color')),
                    Components\FileUpload::make('image')
                        ->label(__('filament-panels::resources/pages/product.fields.image'))
                        ->image()
                        ->disk('public')
                        ->directory('uploads/product')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'])
                        ->required(),
                    Components\FileUpload::make('pdf')
                        ->label(__('filament-panels::resources/pages/product.fields.pdf'))
                        ->disk('public')
                        ->directory('uploads/pdfproduct')
                        ->visibility('public')
                        ->maxSize(4096)
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            $extension = $file->getClientOriginalExtension();
                            return Str::uuid() . '.' . $extension;
                        })
                        ->acceptedFileTypes(['application/pdf']),
                ]),

            Step::make(__('filament-panels::resources/pages/product.fields.Usage_Instructions'))
                ->description(__('filament-panels::resources/pages/product.fields.Product_Usage_Instructions'))
                ->schema([
                    Components\Repeater::make('usage_instructions')
                        ->label(__('filament-panels::resources/pages/product.fields.Usage_Instructions'))
                        ->schema([
                            LanguageTabs::make([
                                Components\TextInput::make('title')
                                    ->label(__('filament-panels::resources/pages/product.fields.title'))
                                    ->required(),
                                Components\MarkdownEditor::make('content')
                                    ->label(__('filament-panels::resources/pages/product.fields.content')),
                            ]),
                        ])
                        ->addActionLabel(__('filament-panels::resources/pages/product.fields.Add_Usage_Instruction'))
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title']['en'] ?? $state['title']['ar'] ?? null)
                        ->required(),
                ]),
        ];
    }


    protected function mutateFormDataBeforeCreate(array $data): array
    {

        if (!empty($data['title']['ar'])) {
            $data['slug']['ar'] = str_replace(' ', '-', $data['title']['ar']);
        }

        if (!empty($data['title']['en'])) {
            $data['slug']['en'] = str_replace(' ', '-', $data['title']['en']);
        }

        return $data;
    }

    protected function afterCreate(): void
    {
        // حفظ تعليمات الاستخدام بعد إنشاء المنتج
        $usageInstructions = $this->form->getState()['usage_instructions'] ?? [];

        if (!empty($usageInstructions) && $this->record) {
            foreach ($usageInstructions as $instruction) {
                UsageInstruction::create([
                    'product_id' => $this->record->id,
                    'title' => $instruction['title'],
                    'content' => $instruction['content'],
                ]);
            }
        }
    }
}
