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
        return Inertia::render('public/about-istqb');
    }

    public function aboutCitl()
    {
        return Inertia::render('public/about-citl');
    }

    public function vision()
    {
        return Inertia::render('public/vision');
    }

    public function missions()
    {
        return Inertia::render('public/missions');
    }

    public function executiveBoard()
    {
        return Inertia::render('public/executive-board');
    }

    // Adhésion Section
    public function members()
    {
        return Inertia::render('public/members');
    }

    public function workingGroups()
    {
        return Inertia::render('public/working-groups');
    }

    // Certifications Section
    public function whyCertification()
    {
        return Inertia::render('public/why-certification');
    }

    public function coreFoundation()
    {
        return Inertia::render('public/core-foundation');
    }

    public function coreAdvanced()
    {
        return Inertia::render('public/core-advanced');
    }

    public function specialist()
    {
        return Inertia::render('public/specialist');
    }

    public function expertLevel()
    {
        return Inertia::render('public/expert-level');
    }

    public function a4qPracticalTester()
    {
        return Inertia::render('public/a4q-practical-tester');
    }

    // Examens Section
    public function examQuestions()
    {
        return Inertia::render('public/exam-questions');
    }

    public function examFees()
    {
        return Inertia::render('public/exam-fees');
    }

    public function examRegistration()
    {
        return Inertia::render('public/exam-registration');
    }

    public function examFaq()
    {
        return Inertia::render('public/exam-faq');
    }

    public function antiPiracy()
    {
        return Inertia::render('public/anti-piracy');
    }

    public function glossary()
    {
        return Inertia::render('public/glossary');
    }

    // Training Organizations Section
    public function accreditedOrganizations()
    {
        return Inertia::render('public/accredited-organizations');
    }

    public function accreditationRequest()
    {
        return Inertia::render('public/accreditation-request');
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
        return Inertia::render('public/register-certified-testers');
    }

    public function certifiedTestersList()
    {
        return Inertia::render('public/certified-testers-list');
    }

    public function istqbRegistry()
    {
        return Inertia::render('public/istqb-registry');
    }

    // Contact
    public function contact()
    {
        return Inertia::render('public/contact');
    }
}
