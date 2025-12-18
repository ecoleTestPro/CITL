<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Faq\FaqRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    protected $faqRepository;

    public function __construct(FaqRepository $faqRepository)
    {
        $this->faqRepository = $faqRepository;
    }

    /**
     * Display a listing of the FAQs.
     */
    public function index(Request $request)
    {
        $filters = [
            'category' => $request->input('category'),
            'locale' => $request->input('locale'),
            'is_active' => $request->input('is_active'),
            'search' => $request->input('search'),
            'per_page' => $request->input('per_page', 15),
        ];

        $faqs = $this->faqRepository->getAllWithFilters($filters);
        $categories = $this->faqRepository->getCategories();

        return Inertia::render('dashboard/faqs/index', [
            'faqs' => $faqs,
            'categories' => $categories,
            'filters' => $filters,
        ]);
    }

    /**
     * Store a newly created FAQ in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'category' => 'required|string|max:255',
            'order' => 'integer|min:0',
            'is_active' => 'boolean',
            'locale' => 'required|string|size:2|in:fr,en',
        ]);

        $faq = $this->faqRepository->create($validated);

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ créée avec succès.');
    }

    /**
     * Update the specified FAQ in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'category' => 'required|string|max:255',
            'order' => 'integer|min:0',
            'is_active' => 'boolean',
            'locale' => 'required|string|size:2|in:fr,en',
        ]);

        $faq = $this->faqRepository->update($id, $validated);

        if (! $faq) {
            return redirect()->route('admin.faqs.index')
                ->with('error', 'FAQ non trouvée.');
        }

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ mise à jour avec succès.');
    }

    /**
     * Remove the specified FAQ from storage.
     */
    public function destroy($id)
    {
        $deleted = $this->faqRepository->delete($id);

        if (! $deleted) {
            return redirect()->route('admin.faqs.index')
                ->with('error', 'FAQ non trouvée.');
        }

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ supprimée avec succès.');
    }

    /**
     * Toggle active status of the FAQ.
     */
    public function toggleActive($id)
    {
        $toggled = $this->faqRepository->toggleActive($id);

        if (! $toggled) {
            return back()->with('error', 'FAQ non trouvée.');
        }

        return back()->with('success', 'Statut de la FAQ mis à jour.');
    }

    /**
     * Update order of FAQ.
     */
    public function updateOrder(Request $request, $id)
    {
        $validated = $request->validate([
            'order' => 'required|integer|min:0',
        ]);

        $updated = $this->faqRepository->updateOrder($id, $validated['order']);

        if (! $updated) {
            return back()->with('error', 'FAQ non trouvée.');
        }

        return back()->with('success', 'Ordre de la FAQ mis à jour.');
    }
}
