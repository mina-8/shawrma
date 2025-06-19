<?php

namespace App\Http\Controllers;

use App\Models\MainProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MainProductController extends Controller
{
    public function index(){
        $appLang = app()->getLocale();
        $mainProduct = MainProduct::whereNull('solve_brands_id')->latest()
                                    ->get()
                                    ->map(function ($mainproduct) use($appLang){
                                        return [
                                            'id' => $mainproduct->id,
                                            'title' => $mainproduct->getTranslation('title' , $appLang),
                                            'color'=> $mainproduct->color,
                                            'icon' => Storage::url($mainproduct->icon),
                                            'image' => Storage::url($mainproduct->image),
                                            'slug' => $mainproduct->getTranslation('slug' , $appLang)
                                        ];
                                    });
        $products = Product::all()->map(function ($product) use($appLang){
            return [
                'id'=>$product->id,
                'title' => $product->getTranslation('title' , $appLang),
                'slug' => $product->getTranslation('slug' , $appLang)
            ];
        });

        return Inertia::render('Welcome/MainProduct/Index' , ['mainproduct'=>$mainProduct , 'product'=>$products]);
    }
    public function show(string $lang, string $slug)
    {
        $mainProduct = MainProduct::with('products:id,title,slug,image,description,special,mainproduct_id')
            ->where("slug->$lang", $slug)
            ->first();

        if (!$mainProduct) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $mainTitle = $mainProduct->getTranslation('title', $lang);
        $mainContent = $mainProduct->getTranslation('content', $lang);
        $mainSlug = $mainProduct->getTranslation('slug', $lang);
        $mainImage = Storage::url($mainProduct->image);

        $products = $mainProduct->products->map(function ($product) use ($lang) {
            return [
                'id' => $product->id,
                'title' => $product->getTranslation('title', $lang),
                'description' => $product->getTranslation('description' , $lang),
                'slug' => $product->getTranslation('slug', $lang),
                'image' => Storage::url($product->image),

                'special' => $product->special
            ];
        });

        $mainProductData = [
            'id' => $mainProduct->id,
            'title' => $mainTitle,
            'content' => $mainContent,
            'slug' => $mainSlug,
            'image' => $mainImage,
            'color'=> $mainProduct->color,
            'products' => $products,
        ];

        $slugs = $mainProduct->getTranslations('slug');

        return Inertia::render('Welcome/MainProduct/Show', [
            'mainproduct' => $mainProductData,
            'slugs' => $slugs,
        ]);
    }
}
