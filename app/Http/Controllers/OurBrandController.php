<?php

namespace App\Http\Controllers;

use App\Models\FactNumber;
use App\Models\MainProduct;
use App\Models\OurBrand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OurBrandController extends Controller
{
    public function show(string $lang, string $slug)
    {
        $brand = OurBrand::where("slug->$lang", $slug)->first();
        if (!$brand) {
            abort(404);
        }

        $slugs = $brand->getTranslations('slug');

        $corestations = [];
        $factsandnumbers = [];
        if ($brand && $brand->factsandnumbers !== null) {
            $factsandnumbers = FactNumber::where(function ($query) {
                $query->whereNull('factable_type')
                    ->orWhere('factable_type', OurBrand::class);
            })->with('factable')
                ->get()
                ->map(function ($factnumber) use ($lang) {
                    return [
                        'id' => $factnumber->id,
                        'title' => $factnumber->getTranslation('title', $lang),
                        'number' => $factnumber->number,
                        'image' => Storage::url($factnumber->image)
                    ];
                });
        }
        // stations
        if ($brand && $brand->corestation !== null) {
            $corestations =  $brand->corestation->map(function ($corestation) use ($lang) {
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title', $lang),
                    'content' => $corestation->getTranslation('content', $lang),
                    'image' => Storage::url($corestation->image)
                ];
            });
        }

        $otherbrands = OurBrand::whereNot('id', $brand->id)
            ->select('id', 'image', 'slug')
            ->get()
            ->map(function ($otherbrand) use ($lang) {
                return [
                    'id' => $otherbrand->id,
                    'image' => Storage::url($otherbrand->image),
                    'slug' => $otherbrand->getTranslation('slug', $lang)
                ];
            });

        $mainproducts = MainProduct::latest()
            ->take(15)
            ->select('id', 'title', 'image', 'slug')
            ->get()
            ->map(function ($mainproduct) use ($lang) {
                return [
                    'id' => $mainproduct->id,
                    'title' => $mainproduct->getTranslation('title', $lang),
                    'image' => Storage::url($mainproduct->image),
                    'slug' => $mainproduct->getTranslation('slug', $lang)
                ];
            });

        $dataBrand = [
            'id' => $brand->id,
            'header_title' => $brand->getTranslation('header_title' , $lang) ,
            'title' => $brand->getTranslation('title' , $lang) ,
            'content' => $brand->getTranslation('content' , $lang) ,
            'color' => $brand->color,
            'banner' => Storage::url($brand->banner),
            'image' => Storage::url($brand->image),
            'pdf' => Storage::url($brand->pdf),
            'slug' => $brand->getTranslation('slug' , $lang) ,
            'factsnumber' => $factsandnumbers,
            'corestation' => $corestations
        ];

        return Inertia::render('Welcome/OurBrand/Show' , ['brand'=>$dataBrand , 'otherbrand' => $otherbrands , 'mainproducts' => $mainproducts , 'slug' => $slugs]);
    }
}
