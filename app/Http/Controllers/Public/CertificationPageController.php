<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Repositories\Certification\CertificationCategoryRepository;
use App\Repositories\Certification\CertificationRepository;
use Inertia\Inertia;

class CertificationPageController extends Controller
{
    public function __construct(
        protected CertificationCategoryRepository $categoryRepo,
        protected CertificationRepository $certificationRepo
    ) {}

    public function showByCategory(string $categorySlug)
    {
        $category = $this->categoryRepo->findBySlug($categorySlug);

        if (! $category || ! $category->is_active) {
            abort(404);
        }

        $certifications = $this->certificationRepo->getByCategorySlug($categorySlug);

        return Inertia::render('public/certifications/'.$categorySlug, [
            'category' => $category,
            'certifications' => $certifications,
        ]);
    }
}
