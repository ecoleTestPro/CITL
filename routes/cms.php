<?php

use App\Http\Controllers\Cms\CmsPagePrivateController;
use App\Http\Controllers\Cms\CmsPagePublicController;
use App\Http\Controllers\Cms\CmsMenuController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| CMS Private Routes (Admin)
|--------------------------------------------------------------------------
|
| Routes for CMS management (CRUD operations).
| All routes are protected by auth middleware.
|
*/

Route::middleware(['auth', 'verified'])->prefix('cms')->name('cms.')->group(function () {
    // Pages Management (Private/Admin)
    Route::resource('pages', CmsPagePrivateController::class);
    Route::post('pages/{page}/set-homepage', [CmsPagePrivateController::class, 'setAsHomepage'])
        ->name('pages.set-homepage');

    // Menus Management
    Route::resource('menus', CmsMenuController::class);
});

/*
|--------------------------------------------------------------------------
| CMS Public Routes
|--------------------------------------------------------------------------
|
| Public-facing routes for viewing CMS pages.
| Format: /p/{slug} (e.g., /p/about-us, /p/contact)
|
*/

// Public page view
Route::get('/p/{slug}', [CmsPagePublicController::class, 'show'])
    ->name('page.show')
    ->where('slug', '[a-z0-9-]+');

/*
|--------------------------------------------------------------------------
| CMS Public API Routes
|--------------------------------------------------------------------------
|
| API endpoints for fetching dynamic CMS content via AJAX.
|
*/

Route::prefix('api/cms')->name('api.cms.')->group(function () {
    // Get page content by slug
    Route::get('pages/{slug}', [CmsPagePublicController::class, 'getBySlug'])
        ->name('pages.by-slug');

    // Get homepage content
    Route::get('homepage', [CmsPagePublicController::class, 'getHomepage'])
        ->name('homepage');
});
