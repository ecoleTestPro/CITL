<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Glossary\GlossaryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GlossaryController extends Controller
{
    protected $glossaryRepo;

    public function __construct(GlossaryRepository $glossaryRepo)
    {
        $this->glossaryRepo = $glossaryRepo;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = [
            'letter' => $request->get('letter'),
            'search' => $request->get('search'),
            'is_active' => $request->get('is_active'),
        ];

        $glossaries = $this->glossaryRepo->getPaginated(15, array_filter($filters));

        return Inertia::render('dashboard/glossary/index', [
            'glossaries' => $glossaries,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/glossary/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'term' => 'required|string|max:255',
            'definition' => 'required|string',
            'category' => 'nullable|string|max:255',
            'letter' => 'required|string|size:1',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $this->glossaryRepo->create($validated);

        return redirect()->route('dashboard.glossary.index')
            ->with('success', 'Glossary term created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $glossary = $this->glossaryRepo->find($id);

        if (!$glossary) {
            return redirect()->route('dashboard.glossary.index')
                ->with('error', 'Glossary term not found.');
        }

        return Inertia::render('dashboard/glossary/edit', [
            'glossary' => $glossary,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'term' => 'required|string|max:255',
            'definition' => 'required|string',
            'category' => 'nullable|string|max:255',
            'letter' => 'required|string|size:1',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $glossary = $this->glossaryRepo->update($id, $validated);

        if (!$glossary) {
            return redirect()->route('dashboard.glossary.index')
                ->with('error', 'Glossary term not found.');
        }

        return redirect()->route('dashboard.glossary.index')
            ->with('success', 'Glossary term updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $deleted = $this->glossaryRepo->delete($id);

        if (!$deleted) {
            return redirect()->route('dashboard.glossary.index')
                ->with('error', 'Glossary term not found.');
        }

        return redirect()->route('dashboard.glossary.index')
            ->with('success', 'Glossary term deleted successfully.');
    }
}
