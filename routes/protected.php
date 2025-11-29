<?php

use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Dashboard\AccreditedOrganizationController;
use App\Http\Controllers\Dashboard\BlogCategoryController;
use App\Http\Controllers\Dashboard\BlogController;
use App\Http\Controllers\Dashboard\CertificationCategoryController;
use App\Http\Controllers\Dashboard\CertificationController;
use App\Http\Controllers\Dashboard\CertificationManagementController;
use App\Http\Controllers\Dashboard\ExamRegistrationController;
use App\Http\Controllers\Dashboard\GlossaryController;
use App\Http\Controllers\Dashboard\MembershipApplicationController;
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

    // Certification Management Routes (Unified)
    Route::prefix('dashboard/certifications')->name('dashboard.certifications.')->group(function () {
        Route::get('/', [CertificationManagementController::class, 'index'])->name('manage');

        // Category routes
        Route::post('/categories/store', [CertificationManagementController::class, 'storeCategory'])->name('categories.store');
        Route::post('/categories/{id}/update', [CertificationManagementController::class, 'updateCategory'])->name('categories.update');
        Route::delete('/categories/{id}/delete', [CertificationManagementController::class, 'deleteCategory'])->name('categories.delete');

        // Certification routes
        Route::post('/store', [CertificationManagementController::class, 'storeCertification'])->name('store');
        Route::post('/{id}/update', [CertificationManagementController::class, 'updateCertification'])->name('update');
        Route::delete('/{id}/delete', [CertificationManagementController::class, 'deleteCertification'])->name('delete');

        // Document routes
        Route::post('/documents/upload', [\App\Http\Controllers\Admin\CertificationDocumentController::class, 'upload'])->name('documents.upload');
        Route::get('/{certificationId}/documents', [\App\Http\Controllers\Admin\CertificationDocumentController::class, 'index'])->name('documents.index');
        Route::delete('/documents/{id}/delete', [\App\Http\Controllers\Admin\CertificationDocumentController::class, 'delete'])->name('documents.delete');
        Route::post('/documents/{documentId}/tags/attach', [\App\Http\Controllers\Admin\CertificationDocumentController::class, 'attachTags'])->name('documents.tags.attach');
        Route::post('/documents/{documentId}/tags/detach', [\App\Http\Controllers\Admin\CertificationDocumentController::class, 'detachTag'])->name('documents.tags.detach');

        // Tag routes
        Route::get('/tags', [\App\Http\Controllers\Admin\CertificationDocumentController::class, 'getTags'])->name('tags.index');
        Route::post('/tags/store', [\App\Http\Controllers\Admin\CertificationDocumentController::class, 'createTag'])->name('tags.store');
    });

    // Exam Registration Management Routes
    Route::prefix('dashboard/exam-registrations')->name('dashboard.exam-registrations.')->group(function () {
        Route::get('/', [ExamRegistrationController::class, 'index'])->name('index');
        Route::post('/{id}/status', [ExamRegistrationController::class, 'updateStatus'])->name('status');
        Route::delete('/{id}', [ExamRegistrationController::class, 'destroy'])->name('destroy');
    });

    // Membership Application Management Routes
    Route::prefix('dashboard/membership-applications')->name('dashboard.membership-applications.')->group(function () {
        Route::get('/', [MembershipApplicationController::class, 'index'])->name('index');
        Route::post('/{id}/status', [MembershipApplicationController::class, 'updateStatus'])->name('status');
        Route::delete('/{id}', [MembershipApplicationController::class, 'destroy'])->name('destroy');
    });

    // Glossary Management Routes
    Route::prefix('dashboard/glossary')->name('dashboard.glossary.')->group(function () {
        Route::get('/', [GlossaryController::class, 'index'])->name('index');
        Route::get('/create', [GlossaryController::class, 'create'])->name('create');
        Route::post('/', [GlossaryController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [GlossaryController::class, 'edit'])->name('edit');
        Route::put('/{id}', [GlossaryController::class, 'update'])->name('update');
        Route::delete('/{id}', [GlossaryController::class, 'destroy'])->name('destroy');
    });

    // Accredited Organizations Management Routes
    Route::prefix('dashboard/accredited-organizations')->name('dashboard.accredited-organizations.')->group(function () {
        Route::get('/', [AccreditedOrganizationController::class, 'index'])->name('index');
        Route::post('/', [AccreditedOrganizationController::class, 'store'])->name('store');
        Route::post('/{id}', [AccreditedOrganizationController::class, 'update'])->name('update');
        Route::delete('/{id}', [AccreditedOrganizationController::class, 'destroy'])->name('destroy');
    });

    // Blog Management Routes
    Route::prefix('dashboard/blog')->name('dashboard.blog.')->group(function () {
        Route::get('/', [BlogController::class, 'index'])->name('index');
        Route::post('/', [BlogController::class, 'store'])->name('store');
        Route::put('/{id}', [BlogController::class, 'update'])->name('update');
        Route::delete('/{id}', [BlogController::class, 'destroy'])->name('destroy');
        Route::post('/{id}/toggle-publish', [BlogController::class, 'togglePublish'])->name('toggle-publish');

        // Blog Category routes (API-style for modal)
        Route::prefix('categories')->name('categories.')->group(function () {
            Route::get('/', [BlogCategoryController::class, 'index'])->name('index');
            Route::post('/', [BlogCategoryController::class, 'store'])->name('store');
            Route::put('/{id}', [BlogCategoryController::class, 'update'])->name('update');
            Route::delete('/{id}', [BlogCategoryController::class, 'destroy'])->name('destroy');
            Route::post('/{id}/toggle-active', [BlogCategoryController::class, 'toggleActive'])->name('toggle-active');
            Route::post('/reorder', [BlogCategoryController::class, 'reorder'])->name('reorder');
        });
    });

    // Events Management Routes
    Route::prefix('dashboard/events')->name('admin.events.')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index');
        Route::post('/', [EventController::class, 'store'])->name('store');
        Route::put('/{id}', [EventController::class, 'update'])->name('update');
        Route::delete('/{id}', [EventController::class, 'destroy'])->name('destroy');
        Route::post('/{id}/toggle-active', [EventController::class, 'toggleActive'])->name('toggle-active');
    });

    // FAQ Management Routes
    Route::prefix('dashboard/faqs')->name('admin.faqs.')->group(function () {
        Route::get('/', [FaqController::class, 'index'])->name('index');
        Route::post('/', [FaqController::class, 'store'])->name('store');
        Route::put('/{id}', [FaqController::class, 'update'])->name('update');
        Route::delete('/{id}', [FaqController::class, 'destroy'])->name('destroy');
        Route::post('/{id}/toggle-active', [FaqController::class, 'toggleActive'])->name('toggle-active');
        Route::post('/{id}/update-order', [FaqController::class, 'updateOrder'])->name('update-order');
    });
});


// Settings Routes
require __DIR__ . '/settings.php';
