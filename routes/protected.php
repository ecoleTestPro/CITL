<?php

use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\PartnerTierController;
use App\Http\Controllers\Api\TranslationController;
use App\Http\Controllers\Dashboard\AccreditedOrganizationController;
use App\Http\Controllers\Dashboard\BlogCategoryController;
use App\Http\Controllers\Dashboard\BlogController;
use App\Http\Controllers\Dashboard\CertificationManagementController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\AccreditationRequestController;
use App\Http\Controllers\Dashboard\CertifiedTesterRegistrationController;
use App\Http\Controllers\Dashboard\ContactRequestController;
use App\Http\Controllers\Dashboard\EmailLogController;
use App\Http\Controllers\Dashboard\ExamRegistrationController;
use App\Http\Controllers\Dashboard\GlossaryController;
use App\Http\Controllers\Dashboard\ImageManagementController;
use App\Http\Controllers\Dashboard\MembershipApplicationController;
use App\Http\Controllers\Dashboard\PageManagementController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Route;

// Protected Routes - Require authentication and email verification
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Translation API Routes
    Route::prefix('api/translate')->name('api.translate.')->group(function () {
        Route::post('/', [TranslationController::class, 'translate'])->name('single');
        Route::post('/multiple', [TranslationController::class, 'translateMultiple'])->name('multiple');
    });

    // Page Management Routes
    Route::prefix('dashboard/pages')->name('dashboard.pages.')->group(function () {
        // API route to get list of editable pages
        Route::get('/list', [PageManagementController::class, 'getEditablePages'])->name('list');

        // Translation API routes
        Route::get('/{page}/translations', [PageManagementController::class, 'getTranslations'])->name('translations.get');
        Route::post('/translations', [PageManagementController::class, 'updateTranslations'])->name('translations.update');

        // Image API routes
        Route::get('/{page}/images', [ImageManagementController::class, 'getImages'])->name('images.get');
        Route::post('/images/upload', [ImageManagementController::class, 'uploadImage'])->name('images.upload');
        Route::get('/images/all', [ImageManagementController::class, 'getAllImages'])->name('images.all');

        // Generic page editor route (handles all pages via slug parameter)
        // This must be at the end to not interfere with other routes
        Route::get('/{pageSlug}', [PageManagementController::class, 'edit'])->name('edit');
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

    // Accreditation Request Management Routes
    Route::prefix('dashboard/accreditation-requests')->name('dashboard.accreditation-requests.')->group(function () {
        Route::get('/', [AccreditationRequestController::class, 'index'])->name('index');
        Route::post('/{id}/status', [AccreditationRequestController::class, 'updateStatus'])->name('status');
        Route::delete('/{id}', [AccreditationRequestController::class, 'destroy'])->name('destroy');
    });

    // Certified Tester Registration Management Routes
    Route::prefix('dashboard/certified-tester-registrations')->name('dashboard.certified-tester-registrations.')->group(function () {
        Route::get('/', [CertifiedTesterRegistrationController::class, 'index'])->name('index');
        Route::post('/{id}/status', [CertifiedTesterRegistrationController::class, 'updateStatus'])->name('status');
        Route::delete('/{id}', [CertifiedTesterRegistrationController::class, 'destroy'])->name('destroy');
    });

    // Contact Messages Management Routes
    Route::prefix('dashboard/contact-messages')->name('dashboard.contact-messages.')->group(function () {
        Route::get('/', [ContactRequestController::class, 'index'])->name('index');
        Route::get('/{id}', [ContactRequestController::class, 'show'])->name('show');
        Route::post('/{id}/status', [ContactRequestController::class, 'updateStatus'])->name('status');
        Route::delete('/{id}', [ContactRequestController::class, 'destroy'])->name('destroy');
    });

    // Email Logs Management Routes
    Route::prefix('dashboard/email-logs')->name('dashboard.email-logs.')->group(function () {
        Route::get('/', [EmailLogController::class, 'index'])->name('index');
        Route::get('/{id}', [EmailLogController::class, 'show'])->name('show');
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

    // Partner Tier Management Routes
    Route::prefix('dashboard/partner-tiers')->name('admin.partner-tiers.')->group(function () {
        Route::get('/', [PartnerTierController::class, 'index'])->name('index');
        Route::post('/', [PartnerTierController::class, 'store'])->name('store');
        Route::put('/{partnerTier}', [PartnerTierController::class, 'update'])->name('update');
        Route::delete('/{partnerTier}', [PartnerTierController::class, 'destroy'])->name('destroy');
        Route::post('/{partnerTier}/toggle-active', [PartnerTierController::class, 'toggleActive'])->name('toggle-active');
    });

    // Partner Management Routes
    Route::prefix('dashboard/partners')->name('admin.partners.')->group(function () {
        Route::get('/', [PartnerController::class, 'index'])->name('index');
        Route::post('/', [PartnerController::class, 'store'])->name('store');
        Route::put('/{partner}', [PartnerController::class, 'update'])->name('update');
        Route::delete('/{partner}', [PartnerController::class, 'destroy'])->name('destroy');
        Route::post('/{partner}/toggle-active', [PartnerController::class, 'toggleActive'])->name('toggle-active');
    });

    // User Management Routes - Admin only
    Route::prefix('dashboard/users')->name('dashboard.users.')->middleware('role:admin')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::put('/{id}', [UserController::class, 'update'])->name('update');
        Route::delete('/{id}', [UserController::class, 'destroy'])->name('destroy');
    });
});

// Settings Routes
require __DIR__.'/settings.php';
