<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('public/home', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    // CITL Section
    public function aboutIstqb()
    {
        return Inertia::render('public/about/about-istqb');
    }

    public function aboutCitl()
    {
        return Inertia::render('public/about/about-citl');
    }

    public function vision()
    {
        return Inertia::render('public/about/vision');
    }

    public function missions()
    {
        return Inertia::render('public/about/missions');
    }

    public function executiveBoard()
    {
        return Inertia::render('public/about/executive-board');
    }

    // Adhésion Section
    public function members()
    {
        return Inertia::render('public/membership/members');
    }

    public function workingGroups()
    {
        return Inertia::render('public/membership/working-groups');
    }

    // Certifications Section
    public function whyCertification()
    {
        return Inertia::render('public/certifications/why-certification');
    }

    public function coreFoundation()
    {
        return Inertia::render('public/certifications/core-foundation');
    }

    public function coreAdvanced()
    {
        return Inertia::render('public/certifications/core-advanced');
    }

    public function specialist()
    {
        return Inertia::render('public/certifications/specialist');
    }

    public function expertLevel()
    {
        return Inertia::render('public/certifications/expert-level');
    }

    public function a4qPracticalTester()
    {
        return Inertia::render('public/certifications/a4q-practical-tester');
    }

    // Examens Section
    public function examQuestions()
    {
        return Inertia::render('public/exams/exam-questions');
    }

    public function examFees()
    {
        return Inertia::render('public/exams/exam-fees');
    }

    public function examRegistration()
    {
        return Inertia::render('public/exams/exam-registration');
    }

    public function examFaq()
    {
        return Inertia::render('public/exams/exam-faq');
    }

    public function antiPiracy()
    {
        return Inertia::render('public/exams/anti-piracy');
    }

    public function glossary()
    {
        return Inertia::render('public/exams/glossary');
    }

    // Training Organizations Section
    public function accreditedOrganizations()
    {
        return Inertia::render('public/training/accredited-organizations');
    }

    public function accreditationRequest()
    {
        return Inertia::render('public/training/accreditation-request');
    }

    // Events & Blog
    public function events()
    {
        return Inertia::render('public/events');
    }

    public function blog()
    {
        return Inertia::render('public/blog');
    }

    // Registration Section
    public function registerCertifiedTesters()
    {
        return Inertia::render('public/registration/register-certified-testers');
    }

    public function certifiedTestersList()
    {
        return Inertia::render('public/registration/certified-testers-list');
    }

    public function istqbRegistry()
    {
        return Inertia::render('public/registration/istqb-registry');
    }

    // Contact
    public function contact()
    {
        return Inertia::render('public/contact');
    }
}
