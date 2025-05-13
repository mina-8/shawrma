<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\ContactformController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CotactUsController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(
    [
        'prefix' => '{lang?}',
        'where' => ['lang' => '[a-zA-Z]{2}(-[a-zA-Z]{2})?'],
        'middleware' => 'lang'
    ],
    function () {

        Route::get('/', function () {
            return Inertia::render('Welcome', [
                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
                'laravelVersion' => Application::VERSION,
                'phpVersion' => PHP_VERSION,
            ]);
        })->name('welcome');

        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->middleware(['auth', 'verified'])->name('dashboard');


        Route::get('home', [HomeController::class, 'index'])->name('home');

        Route::get('about-us', [AboutUsController::class, 'index'])->name('about-us');

        Route::get('contact-us', [CotactUsController::class, 'index'])->name('contact-us');

        Route::get('Products', [ProductController::class, 'index'])->name('products');

        Route::get('contact-form', [ContactformController::class, 'index'])->name('contact-form');

        Route::middleware('auth')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        });
    }

);

require __DIR__ . '/auth.php';
