<?php

namespace App\Http\Middleware;

use App\Models\MainProduct;
use App\Models\OurBrand;
use App\Models\Sustainability;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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
            'mainproducts' => fn() => MainProduct::select('id', 'title', 'slug')
                ->get()
                ->map(function ($mainproduct) use ($appLang) {
                    $mainTitle = $mainproduct->getTranslation('title', $appLang);
                    $mainSlug =  $mainproduct->getTranslation('slug', $appLang);

                    return [
                        'id' => $mainproduct->id,
                        'title' => $mainTitle,
                        'slug' => $mainSlug,
                    ];
                }),
            'Brands' => fn() => OurBrand::select('id', 'header_title', 'slug')
                ->get()
                ->map(function ($brands) use ($appLang) {
                    $headertitle = $brands->getTranslation('header_title', $appLang);
                    $slug = $brands->getTranslation('slug', $appLang);
                    return [
                        'id' => $brands->id,
                        'header_title' => $headertitle,
                        'slug' => $slug
                    ];
                }),
            'sustainabilityreport' => fn() => optional(
                Sustainability::select('pdf')->first(),
                function ($item) {
                    return [
                        'sustainability_pdf'=> Storage::url($item->pdf)
                    ];
                }

            ),
             'flash' => function () {
            return [
                'success' => session('success'),
                'error' => session('error'),
            ];
        },
        ];
    }
}
