<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\BlogController;

use App\Http\Controllers\ContactformController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\HomeController;

use App\Http\Controllers\OurPromiseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MainProductController;
use App\Http\Controllers\OurStoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\HowMakeController;
use App\Http\Controllers\SearchWebController;
use App\Http\Controllers\WorkUsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::fallback(function () {
    return Inertia::render('Welcome/NotFound/NotFound');
});

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

        Route::fallback(function () {
            return Inertia::render('Welcome/NotFound/NotFound');
        });

        Route::get('/', [HomeController::class, 'index'])->name('welcome');

        // about us
        Route::get('about-us', [AboutUsController::class, 'index'])->name('about-us');
        // our story
        Route::get('our-story', [OurStoryController::class, 'index'])->name('our-story');
        // our proimse
        Route::get('our-promise', [OurPromiseController::class, 'index'])->name('our-promise');
        Route::get('pdf-review/{id}', [OurPromiseController::class, 'show'])->name('pdf-review');
        // How Make
        Route::get('how-make', [HowMakeController::class, 'index'])->name('how-make');
        Route::get('how-make/{slug}', [HowMakeController::class, 'show'])->name('how-make.show');

        // main product
        Route::get('mainproduct', [MainProductController::class, 'index'])->name('mainproduct');


        // delivery
        Route::get('delivery' , [DeliveryController::class , 'index'])->name('delivery');

        // products
        // Route::get('product/{slug}', [ProductController::class, 'show'])->name('product.show');



        // news
        Route::get('news', [BlogController::class, 'index'])->name('news');
        Route::get('news/{slug}', [BlogController::class, 'show'])->name('news.show');

        // contact us
        Route::get('contact-us', [ContactUsController::class, 'index'])->name('contact-us');
        Route::post('contact-us', [ContactUsController::class, 'store'])->name('contact-us');

        // contact form
        Route::post('contact-form', [ContactformController::class, 'store'])->name('contact-form');
        // work us
        Route::get('work-us', [WorkUsController::class, 'index'])->name('work-us');
        // Route::get('jobads/{slug}', [WorkUsController::class, 'show'])->name('work-us.jobads.show');



        // search web
        Route::get('search-web', [SearchWebController::class, 'search'])->name('search-web');

        Route::middleware('auth')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        });
    }

);

require __DIR__ . '/auth.php';
