<?php

namespace App\Http\Middleware;

use App\Models\MainProduct;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Route;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $appLang = app()->getLocale();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'applang' =>  $appLang,
            'currentRoute' => Route::currentRouteName(),
            'mainproducts' => fn()=> MainProduct::with('products:id,title,slug,mainproduct_id')
            ->select('id', 'title', 'slug')
            ->get()
            ->map(function ($mainproduct) use ($appLang) {
                $mainTitle = $mainproduct->getTranslation('title', $appLang);
                $mainSlug =  $mainproduct->getTranslation('slug', $appLang);
                $products = $mainproduct->products->map(function ($product) use ($appLang) {
                    $productTitle = $product->getTranslation('title', $appLang);
                    $productSlug = $product->getTranslation('slug', $appLang);
                    return [

                            'id' => $product->id,
                            'title' => $productTitle,
                            'slug' => $productSlug

                    ];
                });
                return [
                    'id' => $mainproduct->id,
                    'title' => $mainTitle,
                    'slug' => $mainSlug,
                    'products' => $products
                ];
            })
        ];
    }
}
