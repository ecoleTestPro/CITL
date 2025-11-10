<?php

namespace App\Http\Controllers;

use App\Models\CmsMenu;
use App\Models\CmsPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CmsMenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = CmsMenu::with('items')->latest()->paginate(15);

        return Inertia::render('cms/menus/index', [
            'menus' => $menus,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('cms/menus/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|unique:cms_menus,location',
            'is_active' => 'boolean',
        ]);

        $menu = CmsMenu::create($validated);

        return redirect()->route('cms.menus.edit', $menu)
            ->with('success', 'Menu créé avec succès');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CmsMenu $menu)
    {
        $menu->load('allItems.page');
        $pages = CmsPage::where('status', 'published')->get(['id', 'title', 'slug']);

        return Inertia::render('cms/menus/edit', [
            'menu' => $menu,
            'pages' => $pages,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CmsMenu $menu)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|unique:cms_menus,location,' . $menu->id,
            'is_active' => 'boolean',
        ]);

        $menu->update($validated);

        return back()->with('success', 'Menu mis à jour');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CmsMenu $menu)
    {
        $menu->delete();

        return redirect()->route('cms.menus.index')
            ->with('success', 'Menu supprimé');
    }
}
