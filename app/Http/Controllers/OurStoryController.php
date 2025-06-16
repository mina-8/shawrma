<?php

namespace App\Http\Controllers;

use App\Models\FactNumber;
use App\Models\OurStory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OurStoryController extends Controller
{
    public function index()
    {
        $appLang = app()->getLocale();

        $ourstory = OurStory::first();

        if (!$ourstory) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }
        $factsandnumbers = [];
        $corestations = [];
        $corestories = [];

        if ($ourstory && $ourstory->factsandnumbers !== null) {
            $factsandnumbers = FactNumber::where(function ($query) {
                $query->whereNull('factable_type')
                    ->orWhere('factable_type', OurStory::class);
            })->with('factable')
                ->get()
                ->map(function ($factnumber) use ($appLang) {
                    return [
                        'id' => $factnumber->id,
                        'title' => $factnumber->getTranslation('title', $appLang),
                        'number' => $factnumber->number,
                        'mark_number' => $factnumber->mark_number,
                        'image' => Storage::url($factnumber->image)
                    ];
                });
        }

        if ($ourstory && $ourstory->corestation !== null) {
            $corestations = $ourstory->corestation->map(function ($corestation) use ($appLang) {
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title', $appLang),
                    'content' => $corestation->getTranslation('content', $appLang),
                    'image' => Storage::url($corestation->image),
                ];
            });
        }

        if ($ourstory && $ourstory->corestory !== null) {
            $corestories = $ourstory->corestory->map(function ($corestory) use ($appLang) {
                return [
                    'id' => $corestory->id,
                    'title' => $corestory->getTranslation('title', $appLang),
                    'youtube_link' => $corestory->youtube_link,
                ];
            });
        }

        $dataOurstory = [
            'id' => $ourstory->id,
            'title' => $ourstory->getTranslation('title', $appLang),
            'description' => $ourstory->getTranslation('description', $appLang),
            'content' => $ourstory->getTranslation('content', $appLang),
            'banner' => $ourstory->banner === null ? null : Storage::url($ourstory->banner),
            'image' => Storage::url($ourstory->image),
            'possibilty' => $factsandnumbers,
            'corestations' => $corestations,
            'corestories' => $corestories
        ];

        return Inertia::render('Welcome/OurStory/Index', ['ourstory' => $dataOurstory]);
    }
}
