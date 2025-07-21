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


        $dataOurstory = [
            'id' => $ourstory->id,
            'title' => $ourstory->getTranslation('title', $appLang),
            'content' => $ourstory->getTranslation('content', $appLang),
            'image' => Storage::url($ourstory->image),
            'possibilty' => $factsandnumbers,
            'corestations' => $corestations,
        ];

        return Inertia::render('Welcome/OurStory/Index', ['ourstory' => $dataOurstory]);
    }
}
