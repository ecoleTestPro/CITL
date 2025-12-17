<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Repositories\Certification\CertificationCategoryRepository;
use App\Repositories\Certification\CertificationRepository;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class PublicController extends Controller
{
    public function __construct(
        protected CertificationCategoryRepository $categoryRepo,
        protected CertificationRepository $certificationRepo
    ) {}

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
        $category = $this->categoryRepo->findByKey('core-foundation');
        if (! $category || ! $category->is_active) {
            abort(404);
        }

        $certifications = $this->certificationRepo->getByCategoryKey('core-foundation');
        $categories = $this->categoryRepo->getActiveCategoriesWithCertifications();

        return Inertia::render('public/certifications/core-foundation', [
            'category' => $category,
            'certifications' => $certifications,
            'categories' => $categories,
        ]);
    }

    public function coreAdvanced()
    {
        $category = $this->categoryRepo->findByKey('core-advanced');
        if (! $category || ! $category->is_active) {
            abort(404);
        }

        $certifications = $this->certificationRepo->getByCategoryKey('core-advanced');
        $categories = $this->categoryRepo->getActiveCategoriesWithCertifications();

        return Inertia::render('public/certifications/core-advanced', [
            'category' => $category,
            'certifications' => $certifications,
            'categories' => $categories,
        ]);
    }

    public function specialist()
    {
        $category = $this->categoryRepo->findByKey('specialist');
        if (! $category || ! $category->is_active) {
            abort(404);
        }

        $certifications = $this->certificationRepo->getByCategoryKey('specialist');
        $categories = $this->categoryRepo->getActiveCategoriesWithCertifications();

        return Inertia::render('public/certifications/specialist', [
            'category' => $category,
            'certifications' => $certifications,
            'categories' => $categories,
        ]);
    }

    public function expertLevel()
    {
        $category = $this->categoryRepo->findByKey('expert-level');
        if (! $category || ! $category->is_active) {
            abort(404);
        }

        $certifications = $this->certificationRepo->getByCategoryKey('expert-level');
        $categories = $this->categoryRepo->getActiveCategoriesWithCertifications();

        return Inertia::render('public/certifications/expert-level', [
            'category' => $category,
            'certifications' => $certifications,
            'categories' => $categories,
        ]);
    }

    public function a4qPracticalTester()
    {
        return Inertia::render('public/certifications/a4q-practical-tester');
    }

    public function certificationDetail(string $slug)
    {
        // Verify certification exists and is active before rendering the page
        $certification = $this->certificationRepo->findBySlugWithCategory($slug);

        if (!$certification || !$certification->is_active) {
            abort(404);
        }

        // Pass only the slug to the page - data will be loaded via axios
        return Inertia::render('public/certifications/certification-detail', [
            'slug' => $slug,
        ]);
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

    // Legal Pages
    public function privacyPolicy()
    {
        return Inertia::render('public/legal/privacy-policy');
    }

    public function terms()
    {
        return Inertia::render('public/legal/terms');
    }
}
