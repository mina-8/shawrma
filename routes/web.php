<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\BlogController;

use App\Http\Controllers\BranchController;
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

        // Route::fallback(function () {
        //     return Inertia::render('Welcome/NotFound/NotFound');
        // });

        Route::get('/', [HomeController::class, 'index'])->name('welcome');
        Route::get('servay' , [HomeController::class , 'servay'])->name('servay');
        Route::get('branches' , [BranchController::class , 'index'])->name('branches');

        Route::middleware('auth')->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        });
    }

);

require __DIR__ . '/auth.php';
