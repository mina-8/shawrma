<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    public function index()
    {
        $appLang = app()->getLocale();

        $aboutus = Aboutus::first();

        if (!$aboutus) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }
        $coresvesions = [];
        $corestations = [];
        $corestories = [];



        if ($aboutus && $aboutus->corevesion !== null) {
            $coresvesions = $aboutus->corevesion->map(function ($corevesion) use ($appLang) {
                return [
                    'id' => $corevesion->id,
                    'title' => $corevesion->getTranslation('title', $appLang),
                    'content' => $corevesion->getTranslation('content', $appLang),
                    'image' => Storage::url($corevesion->image),
                ];
            });
        }
        if ($aboutus && $aboutus->corestation !== null) {
            $corestations = $aboutus->corestation->map(function ($corestation) use ($appLang) {
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title', $appLang),
                    'content' => $corestation->getTranslation('content', $appLang),
                    'image' => Storage::url($corestation->image),
                ];
            });
        }

        if ($aboutus && $aboutus->corestory !== null) {
            $corestories = $aboutus->corestory->map(function ($corestory) use ($appLang) {
                return [
                    'id' => $corestory->id,
                    'title' => $corestory->getTranslation('title', $appLang),
                    'content' => $corestory->getTranslation('content', $appLang),
                    'image' => Storage::url($corestory->image),
                ];
            });
        }

        $products = Product::latest()->get()
        ->map(function ($product) use($appLang){
            return [
                'id' => $product->id,
                'title' => $product->getTranslation('title', $appLang),
                'image' => Storage::url($product->image),
                'link' => $product->link
            ];
        });

        $dataAboutus = [
            'id' => $aboutus->id,
            'title' => $aboutus->getTranslation('title', $appLang),
            'content' => $aboutus->getTranslation('content', $appLang),
            'image' => Storage::url($aboutus->image),
            'coresvesions' => $coresvesions,
            'corestations' => $corestations,
            'corestories' => $corestories,
            'products' => $products
        ];

        return Inertia::render('Welcome/Aboutus/Index', ['aboutus' => $dataAboutus]);
    }
}
