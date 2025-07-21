<?php

namespace App\Http\Controllers;

use App\Models\HowMake;
use App\Models\ProductInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HowMakeController extends Controller
{
    public function index()
    {
        $appLang = app()->getLocale();

        $howmake = HowMake::first();

        if (!$howmake) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $corestations = [];

        if ($howmake && $howmake->corestation !== null) {
            $corestations = $howmake->corestation->map(function ($corestation) use ($appLang) {
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title', $appLang),
                    'content' => $corestation->getTranslation('content', $appLang),
                    'image' => Storage::url($corestation->image),
                ];
            });
        }


        $dataHowMake = [
            'id' => $howmake->id,
            'title' => $howmake->getTranslation('title', $appLang),
            'content' => $howmake->getTranslation('content', $appLang),
            'image' => Storage::url($howmake->image),
            'corestations' => $corestations,
        ];

        return Inertia::render('Welcome/HowMake/Index', ['howmake' => $dataHowMake]);
    }

    public function show(string $lang, string $slug)
    {

        $ProductInfo = ProductInfo::where("slug->$lang", $slug)->first();

        if (!$ProductInfo) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $slugs = $ProductInfo->getTranslations('slug');

        $corestations = [];

        if ($ProductInfo && $ProductInfo->corestation !== null) {
            $corestations = $ProductInfo->corestation->map(function ($corestation) use ($lang) {
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title', $lang),
                    'content' => $corestation->getTranslation('content', $lang),
                    'image' => $corestation->image ? Storage::url($corestation->image) : null,
                ];
            });
        }


        $dataProductInfo = [
            'id' => $ProductInfo->id,
            'nav_title' => $ProductInfo->getTranslation('nav_title', $lang),
            'title' => $ProductInfo->getTranslation('title', $lang),
            'content' => $ProductInfo->getTranslation('content', $lang),
            'image' => $ProductInfo->image ? Storage::url($ProductInfo->image) : null,
            'corestations' => $corestations,
        ];

        return Inertia::render('Welcome/HowMake/Show', ['proinfo' => $dataProductInfo, 'slugs' => $slugs]);
    }
}
