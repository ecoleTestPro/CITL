<?php

use App\Http\Controllers\Dashboard\CertificationCategoryController;
use App\Http\Controllers\Dashboard\CertificationController;
use App\Http\Controllers\Dashboard\PageManagementController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Protected Routes - Require authentication and email verification
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Page Management Routes
    Route::prefix('dashboard/pages')->name('dashboard.pages.')->group(function () {
        Route::get('/home', [PageManagementController::class, 'editHome'])->name('home.edit');
        Route::get('/about-citl', [PageManagementController::class, 'editAboutCITL'])->name('about-citl.edit');
        Route::get('/about-istqb', [PageManagementController::class, 'editAboutISTQB'])->name('about-istqb.edit');
        Route::get('/vision', [PageManagementController::class, 'editVision'])->name('vision.edit');
        Route::get('/missions', [PageManagementController::class, 'editMissions'])->name('missions.edit');
        Route::get('/executive-board', [PageManagementController::class, 'editExecutiveBoard'])->name('executive-board.edit');

        // Translation API routes
        Route::get('/{page}/translations', [PageManagementController::class, 'getTranslations'])->name('translations.get');
        Route::post('/translations', [PageManagementController::class, 'updateTranslations'])->name('translations.update');
    });

    // Certification Management Routes
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('certification-categories', CertificationCategoryController::class);
        Route::resource('certifications', CertificationController::class);
    });
});


// Settings Routes
require __DIR__ . '/settings.php';
