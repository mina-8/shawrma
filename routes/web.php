<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactformController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OurCulterController;
use App\Http\Controllers\OurPromiseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CotactUsController;
use App\Http\Controllers\MainProductController;
use App\Http\Controllers\OurImpactController;
use App\Http\Controllers\OurStoryController;
use App\Http\Controllers\ProductController;
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

        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->middleware(['auth', 'verified'])->name('dashboard');


        Route::get('/', [HomeController::class, 'index'])->name('welcome');

        Route::get('about-us', [AboutUsController::class, 'index'])->name('about-us');

        // our story
        Route::get('our-story' , [OurStoryController::class , 'index'])->name('our-story');
        // our proimse
        Route::get('our-promise' , [OurPromiseController::class , 'index'])->name('our-promise');
        // our culter
        Route::get('our-culter' , [OurCulterController::class , 'index'])->name('our-culture');

        // impact
        Route::get('leading-impact/{slug}' , [OurImpactController::class , 'show'])->name('leading-impact.show');

        Route::get('contact-us', [CotactUsController::class, 'index'])->name('contact-us');

        Route::get('mainproduct/{slug}' , [MainProductController::class , 'show'])->name('mainproduct.show');

        Route::get('Products', [ProductController::class, 'index'])->name('products');
        Route::get('product/{slug}' , [ProductController::class , 'show'])->name('product.show');
        Route::get('product-search' , [ProductController::class , 'search'])->name('product-search');
        Route::get('product-video' , [ProductController::class , 'video'])->name('product-video');

        Route::get('contact-form', [ContactformController::class, 'index'])->name('contact-form');

        Route::get('news/{slug}' , [BlogController::class , 'show'])->name('news.show');

        Route::middleware('auth')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        });
    }

);

require __DIR__ . '/auth.php';
