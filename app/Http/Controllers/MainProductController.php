<?php

namespace App\Http\Controllers;

use App\Models\MainProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MainProductController extends Controller
{
    public function show(string $lang, string $slug)
    {
        $mainProduct = MainProduct::with('products:id,title,slug,image,special,mainproduct_id')
            ->where("slug->$lang", $slug)
            ->first();

        if (!$mainProduct) {
            abort(404);
        }

        $mainTitle = $mainProduct->getTranslation('title', $lang);
        $mainContent = $mainProduct->getTranslation('content', $lang);
        $mainSlug = $mainProduct->getTranslation('slug', $lang);
        $mainImage = Storage::url($mainProduct->image);

        $products = $mainProduct->products->map(function ($product) use ($lang) {
            return [
                'id' => $product->id,
                'title' => $product->getTranslation('title', $lang),
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
            'products' => $products,
        ];

        $slugs = $mainProduct->getTranslations('slug');

        return Inertia::render('Welcome/MainProduct/Show', [
            'mainproduct' => $mainProductData,
            'slugs' => $slugs,
        ]);
    }
}
