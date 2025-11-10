<?php

use App\Http\Controllers\CmsPageController;
use App\Http\Controllers\CmsMenuController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // CMS Routes
    Route::prefix('cms')->name('cms.')->group(function () {
        Route::resource('pages', CmsPageController::class);
        Route::resource('menus', CmsMenuController::class);
    });
});

require __DIR__.'/settings.php';

// Public page view (must be last to avoid conflicts)
Route::get('{slug}', [CmsPageController::class, 'show'])
    ->where('slug', '^(?!admin|dashboard|login|register|forgot-password|reset-password|settings|cms).*$')
    ->name('page.show');
