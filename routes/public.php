<?php

use App\Http\Controllers\Api\CertificationController;
use App\Http\Controllers\Public\PublicController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [PublicController::class, 'home'])->name('home');

// CITL Section
Route::get('/about-istqb', [PublicController::class, 'aboutIstqb'])->name('about-istqb');
Route::get('/about-citl', [PublicController::class, 'aboutCitl'])->name('about-citl');
Route::get('/vision', [PublicController::class, 'vision'])->name('vision');
Route::get('/missions', [PublicController::class, 'missions'])->name('missions');
Route::get('/executive-board', [PublicController::class, 'executiveBoard'])->name('executive-board');

// Adhésion Section
Route::get('/members', [PublicController::class, 'members'])->name('members');
Route::get('/working-groups', [PublicController::class, 'workingGroups'])->name('working-groups');

// Certifications Section
Route::get('/why-certification', [PublicController::class, 'whyCertification'])->name('why-certification');
Route::get('/core-foundation', [PublicController::class, 'coreFoundation'])->name('core-foundation');
Route::get('/core-advanced', [PublicController::class, 'coreAdvanced'])->name('core-advanced');
Route::get('/specialist', [PublicController::class, 'specialist'])->name('specialist');
Route::get('/expert-level', [PublicController::class, 'expertLevel'])->name('expert-level');
Route::get('/a4q-practical-tester', [PublicController::class, 'a4qPracticalTester'])->name('a4q-practical-tester');
Route::get('/certifications/{slug}', [PublicController::class, 'certificationDetail'])->name('certification-detail');

// Examens Section
Route::get('/exam-questions', [PublicController::class, 'examQuestions'])->name('exam-questions');
Route::get('/exam-fees', [PublicController::class, 'examFees'])->name('exam-fees');
Route::get('/exam-registration', [PublicController::class, 'examRegistration'])->name('exam-registration');
Route::get('/exam-faq', [PublicController::class, 'examFaq'])->name('exam-faq');
Route::get('/anti-piracy', [PublicController::class, 'antiPiracy'])->name('anti-piracy');
Route::get('/glossary', [PublicController::class, 'glossary'])->name('glossary');

// Training Organizations Section
Route::get('/accredited-organizations', [PublicController::class, 'accreditedOrganizations'])->name('accredited-organizations');
Route::get('/accreditation-request', [PublicController::class, 'accreditationRequest'])->name('accreditation-request');

// Events & Blog
Route::get('/events', [PublicController::class, 'events'])->name('events');
Route::get('/blog', [PublicController::class, 'blog'])->name('blog');

// Registration Section
Route::get('/register-certified-testers', [PublicController::class, 'registerCertifiedTesters'])->name('register-certified-testers');
Route::get('/certified-testers-list', [PublicController::class, 'certifiedTestersList'])->name('certified-testers-list');
Route::get('/istqb-registry', [PublicController::class, 'istqbRegistry'])->name('istqb-registry');

// Contact
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');

// API Routes
Route::prefix('api')->group(function () {
    Route::get('/certifications', [CertificationController::class, 'index'])->name('api.certifications.index');
    Route::get('/certifications/{slug}', [CertificationController::class, 'show'])->name('api.certifications.show');
});
