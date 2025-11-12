<?php

namespace App\Http\Controllers;

use App\Models\CmsPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CmsPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pages = CmsPage::with('creator')
            ->latest()
            ->paginate(15);

        return Inertia::render('cms/pages/index', [
            'pages' => $pages,
            'pageTypes' => CmsPage::pageTypes(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('cms/pages/create', [
            'pageTypes' => CmsPage::pageTypes(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|array',
            'status' => 'required|in:draft,published',
            'page_type' => 'required|string|in:' . implode(',', array_keys(CmsPage::pageTypes())),
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
        ]);

        $validated['created_by'] = auth()->id();

        $page = CmsPage::create($validated);

        return redirect()->route('cms.pages.edit', $page)
            ->with('success', 'Page créée avec succès');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CmsPage $page)
    {
        return Inertia::render('cms/pages/edit', [
            'page' => $page,
            'pageTypes' => CmsPage::pageTypes(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CmsPage $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|array',
            'status' => 'required|in:draft,published',
            'page_type' => 'required|string|in:' . implode(',', array_keys(CmsPage::pageTypes())),
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
        ]);

        $page->update($validated);

        return back()->with('success', 'Page mise à jour');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CmsPage $page)
    {
        $page->delete();

        return redirect()->route('cms.pages.index')
            ->with('success', 'Page supprimée');
    }

    /**
     * Display the specified page publicly.
     */
    public function show($slug)
    {
        $page = CmsPage::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('cms/page-view', [
            'page' => $page,
        ]);
    }

    /**
     * Set a page as the homepage.
     */
    public function setAsHomepage(CmsPage $page)
    {
        // Remove homepage status from all other pages
        CmsPage::where('is_homepage', true)->update(['is_homepage' => false]);

        // Set this page as homepage
        $page->update(['is_homepage' => true]);

        return back()->with('success', 'Page définie comme page d\'accueil');
    }
}
