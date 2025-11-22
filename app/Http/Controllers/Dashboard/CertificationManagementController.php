<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Certification\CertificationCategoryRepository;
use App\Repositories\Certification\CertificationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificationManagementController extends Controller
{
    protected $certificationRepository;
    protected $categoryRepository;

    public function __construct(
        CertificationRepository $certificationRepository,
        CertificationCategoryRepository $categoryRepository
    ) {
        $this->certificationRepository = $certificationRepository;
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Display unified certification management page.
     */
    public function index()
    {
        $categories = $this->categoryRepository->getAllOrdered();
        $certifications = $this->certificationRepository->getAllWithCategories();

        return Inertia::render('dashboard/certifications/manage', [
            'categories' => $categories,
            'certifications' => $certifications,
        ]);
    }

    /**
     * Store a new category.
     */
    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:certification_categories,slug',
            'description' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $this->categoryRepository->create($validated);

        return redirect()->back()->with('success', 'Catégorie créée avec succès.');
    }

    /**
     * Update a category.
     */
    public function updateCategory(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:certification_categories,slug,' . $id,
            'description' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $this->categoryRepository->update($id, $validated);

        return redirect()->back()->with('success', 'Catégorie mise à jour avec succès.');
    }

    /**
     * Delete a category.
     */
    public function deleteCategory(int $id)
    {
        $category = $this->categoryRepository->findById($id);

        // Check if category can be deleted
        if (!$category->can_delete) {
            return redirect()->back()->with('error', 'Cette catégorie par défaut ne peut pas être supprimée.');
        }

        $this->categoryRepository->delete($id);

        return redirect()->back()->with('success', 'Catégorie supprimée avec succès.');
    }

    /**
     * Store a new certification.
     */
    public function storeCertification(Request $request)
    {
        $validated = $request->validate([
            'certification_category_id' => 'required|exists:certification_categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:certifications,slug',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'exam_questions' => 'nullable|integer',
            'exam_passing_score' => 'nullable|integer',
            'exam_total_points' => 'nullable|integer',
            'exam_duration' => 'nullable|string',
            'syllabus_url' => 'nullable|url',
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $this->certificationRepository->create($validated);

        return redirect()->back()->with('success', 'Certification créée avec succès.');
    }

    /**
     * Update a certification.
     */
    public function updateCertification(Request $request, int $id)
    {
        $validated = $request->validate([
            'certification_category_id' => 'required|exists:certification_categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:certifications,slug,' . $id,
            'subtitle' => 'nullable|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'exam_questions' => 'nullable|integer',
            'exam_passing_score' => 'nullable|integer',
            'exam_total_points' => 'nullable|integer',
            'exam_duration' => 'nullable|string',
            'syllabus_url' => 'nullable|url',
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $this->certificationRepository->update($id, $validated);

        return redirect()->back()->with('success', 'Certification mise à jour avec succès.');
    }

    /**
     * Delete a certification.
     */
    public function deleteCertification(int $id)
    {
        $this->certificationRepository->delete($id);

        return redirect()->back()->with('success', 'Certification supprimée avec succès.');
    }
}
