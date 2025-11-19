<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Protected Routes - Require authentication and email verification
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


// Settings Routes
require __DIR__ . '/settings.php';
