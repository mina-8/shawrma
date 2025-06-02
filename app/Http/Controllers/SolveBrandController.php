<?php

namespace App\Http\Controllers;

use App\Models\SolveBrand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SolveBrandController extends Controller
{
    public function index(string $lang, string $slug)
    {
        $solvebrand = SolveBrand::with(['mainproducts:id,solve_brands_id,title,slug,image,icon'])->where("slug->$lang", $slug)->first();
        if (!$solvebrand) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }
        $datasolvebrand = [
            'id' => $solvebrand->id,
            'banner' => Storage::url($solvebrand->banner),
            'title' => $solvebrand->getTranslation('title', $lang),
            'slug' => $solvebrand->getTranslation('slug', $lang),
            'mainproducts' => $solvebrand->mainproducts->map(function ($product) use ($lang) {
                return [
                    'id' => $product->id,
                    'title' => $product->getTranslation('title', $lang),
                    'image' => Storage::url($product->image),
                    'icons' => Storage::url($product->icon),
                    'slug' => $product->getTranslation('slug', $lang),
                ];
            })
        ];
        return Inertia::render('Welcome/SolveBrand/Index', ['solvebrand' => $datasolvebrand]);
    }
}
