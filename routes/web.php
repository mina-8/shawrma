<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BuildInformationController;
use App\Http\Controllers\ContactformController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OurBrandController;
use App\Http\Controllers\OurCulterController;
use App\Http\Controllers\OurGoalController;
use App\Http\Controllers\OurPromiseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CotactUsController;
use App\Http\Controllers\InnovationController;
use App\Http\Controllers\MainProductController;
use App\Http\Controllers\OurImpactController;
use App\Http\Controllers\OurStoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SearchWebController;
use App\Http\Controllers\SustainabilityController;
use App\Http\Controllers\WorkUsController;
use App\Http\Controllers\SolveBrandController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(
    [
        'prefix' => '{lang?}',
        'where' => [
            // Exclude 'livewire' and 'admin' from being matched as language
            'lang' => '(?!livewire|admin)[a-zA-Z]{2}(-[a-zA-Z]{2})?'
        ],
        'middleware' => 'lang'
    ],
    function () {

        // Route::get('/dashboard', function () {
        //     return Inertia::render('Dashboard');
        // })->middleware(['auth', 'verified'])->name('dashboard');


        Route::get('/', [HomeController::class, 'index'])->name('welcome');

        // our story
        Route::get('our-story' , [OurStoryController::class , 'index'])->name('our-story');
        // our proimse
        Route::get('our-promise' , [OurPromiseController::class , 'index'])->name('our-promise');
        // our culter
        Route::get('our-culture' , [OurCulterController::class , 'index'])->name('our-culture');
        // builiding best
        Route::get('building-best'  , [OurGoalController::class , 'index'])->name('building-best');

        // impact
        Route::get('leading-impact/{slug}' , [OurImpactController::class , 'show'])->name('leading-impact.show');

        // Sustainability
        Route::get('Sustainability' , [SustainabilityController::class , 'index'])->name('Sustainability');
        // projects
        Route::get('projects' , [ProjectController::class , 'index'])->name('projects');
        Route::get('projects/{slug}' , [ProjectController::class , 'show'])->name('projects.show');
        Route::get('projects-filter' , [ProjectController::class , 'filter'])->name('projects-filter');
        // innovation
        Route::get('innovation' , [InnovationController::class , 'index'])->name('innovation');


        // main product
        Route::get('mainproduct' , [MainProductController::class , 'index'])->name('mainproduct');
        Route::get('mainproduct/{slug}' , [MainProductController::class , 'show'])->name('mainproduct.show');

        // products
        Route::get('Products', [ProductController::class, 'index'])->name('products');
        Route::get('product/{slug}' , [ProductController::class , 'show'])->name('product.show');
        Route::get('product-search' , [ProductController::class , 'search'])->name('product-search');
        Route::get('product-video' , [ProductController::class , 'video'])->name('product-video');


        // brands
        Route::get('brand-show/{slug}' , [OurBrandController::class , 'show'])->name('brand-show');


        // solve brand
        Route::get('solve-brand/{slug}' , [SolveBrandController::class , 'index'])->name('solve-brand');

        // news
        Route::get('news' , [BlogController::class , 'index'])->name('news');
        Route::get('news/{slug}' , [BlogController::class , 'show'])->name('news.show');

        // contact us
        Route::get('contact-us' , [ContactUsController::class , 'index'])->name('contact-us');
        Route::post('contact-us' , [ContactUsController::class , 'store'])->name('contact-us');

        // contact form
        Route::post('contact-form' , [ContactformController::class , 'store'])->name('contact-form');
        // work us
        Route::get('work-us' , [WorkUsController::class , 'index'])->name('work-us');

        // build information
        Route::get('build-information' , [BuildInformationController::class , 'index'])->name('build-information');

        // search web
        Route::get('search-web' , [SearchWebController::class , 'search'])->name('search-web');

        Route::middleware('auth')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        });
    }

);

require __DIR__ . '/auth.php';
