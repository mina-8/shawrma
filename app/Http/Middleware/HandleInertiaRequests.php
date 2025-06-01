<?php

namespace App\Http\Middleware;

use App\Models\MainProduct;
use App\Models\OurBrand;
use App\Models\SocialLink;
use App\Models\SolveBrand;
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
            'solvebrands' => fn() => SolveBrand::with(['mainproducts:id,solve_brands_id,title,slug'])
                ->select('id', 'title', 'slug')
                ->get()
                ->map(function ($solvebrand) use ($appLang) {
                    return [
                        'id' => $solvebrand->id,
                        'title' => $solvebrand->getTranslation('title', $appLang),
                        'slug' => $solvebrand->getTranslation('slug', $appLang),
                        'mainproducts' => $solvebrand->mainproducts->map(function ($product) use ($appLang) {
                            return [
                                'id' => $product->id,
                                'title' => $product->getTranslation('title', $appLang),
                                'slug' => $product->getTranslation('slug', $appLang),
                            ];
                        })
                    ];
                }),
            'mainproducts' => fn() => MainProduct::whereNull('solve_brands_id')
                ->select('id', 'title', 'slug')
                ->get()
                ->map(function ($mainproduct) use ($appLang) {

                    return [
                        'id' => $mainproduct->id,
                        'title' => $mainproduct->getTranslation('title', $appLang),
                        'slug' => $mainproduct->getTranslation('slug', $appLang)
                    ];
                }),
            'Brands' => fn() => OurBrand::select('id', 'header_title', 'slug')
                ->get()
                ->map(function ($brands) use ($appLang) {

                    return [
                        'id' => $brands->id,
                        'header_title' => $brands->getTranslation('header_title', $appLang),
                        'slug' => $brands->getTranslation('slug', $appLang)
                    ];
                }),
            'sustainabilityreport' => fn() => optional(
                Sustainability::select('pdf')->first(),
                function ($item) {
                    return [
                        'sustainability_pdf' => Storage::url($item->pdf)
                    ];
                }

            ),
            'socialicons' => fn()=> SocialLink::get(),
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                ];
            },
        ];
    }
}
