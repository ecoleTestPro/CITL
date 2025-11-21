<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Certification\CertificationCategoryRepository;
use App\Repositories\Certification\CertificationRepository;
use Illuminate\Http\Request;

class CertificationController extends Controller
{
    protected $categoryRepository;
    protected $certificationRepository;

    public function __construct(
        CertificationCategoryRepository $categoryRepository,
        CertificationRepository $certificationRepository
    ) {
        $this->categoryRepository = $categoryRepository;
        $this->certificationRepository = $certificationRepository;
    }

    /**
     * Get all active certifications grouped by category.
     */
    public function index()
    {
        $categories = $this->categoryRepository->getAllActiveWithCertifications();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Get a single certification by slug.
     */
    public function show(string $slug)
    {
        $certification = $this->certificationRepository->findBySlugWithCategory($slug);

        if (!$certification) {
            return response()->json([
                'success' => false,
                'message' => 'Certification non trouvée',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $certification,
        ]);
    }
}
