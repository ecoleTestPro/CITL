<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Certification\CertificationCategoryRepository;
use App\Repositories\Certification\CertificationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificationController extends Controller
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
     * Display a listing of the resource.
     */
    public function index()
    {
        $certifications = $this->certificationRepository->getAllWithCategories();

        return Inertia::render('dashboard/certifications/index', [
            'certifications' => $certifications,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = $this->categoryRepository->getAllOrdered();

        return Inertia::render('dashboard/certifications/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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

        return redirect()->route('dashboard.certifications.index')
            ->with('success', 'Certification created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $certification = $this->certificationRepository->findByIdWithCategory($id);

        return Inertia::render('dashboard/certifications/show', [
            'certification' => $certification,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $certification = $this->certificationRepository->findById($id);
        $categories = $this->categoryRepository->getAllOrdered();

        return Inertia::render('dashboard/certifications/edit', [
            'certification' => $certification,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
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

        return redirect()->route('dashboard.certifications.index')
            ->with('success', 'Certification updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $certification = $this->certificationRepository->findById($id);

        // Prevent deletion of protected certifications
        if ($certification && !$certification->can_delete) {
            return redirect()->route('dashboard.certifications.index')
                ->with('error', 'Cette certification ne peut pas être supprimée car elle est protégée par le système.');
        }

        $this->certificationRepository->delete($id);

        return redirect()->route('dashboard.certifications.index')
            ->with('success', 'Certification deleted successfully.');
    }
}
