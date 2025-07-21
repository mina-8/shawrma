<?php

namespace App\Http\Middleware;

use App\Models\MainProduct;
use App\Models\OurBrand;
use App\Models\ProductInfo;
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
            'productinfo_nav' => fn()=> ProductInfo::select('id' , 'nav_title' , 'slug')
                                    ->get()
                                    ->map(function ($proinfo) use($appLang){
                                        return [
                                            'id' => $proinfo->id,
                                            'nav_title' => $proinfo->nav_title,
                                            'slug' => $proinfo->slug
                                        ];
                                    }),
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
