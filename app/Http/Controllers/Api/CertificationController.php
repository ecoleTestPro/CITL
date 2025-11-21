<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Certification\CertificationCategoryRepository;
use Illuminate\Http\Request;

class CertificationController extends Controller
{
    protected $categoryRepository;

    public function __construct(CertificationCategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
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
}
