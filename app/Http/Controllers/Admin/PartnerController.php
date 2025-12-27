<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner\Partner;
use App\Models\Partner\PartnerTier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $query = Partner::with('tier')->orderBy('name');

        if ($request->filled('tier')) {
            $query->where('partner_tier_id', $request->input('tier'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $partners = $query->get();
        $tiers = PartnerTier::active()->orderBy('name')->get();

        return Inertia::render('dashboard/partners/index', [
            'partners' => $partners,
            'tiers' => $tiers,
            'filters' => $request->only(['tier', 'search', 'is_active']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'partner_tier_id' => 'required|exists:partner_tiers,id',
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'website' => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'is_active' => 'boolean',
            'partnership_start_date' => 'nullable|date',
            'partnership_end_date' => 'nullable|date|after_or_equal:partnership_start_date',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('partners', 'public');
        }

        Partner::create($validated);

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partenaire créé avec succès.');
    }

    public function update(Request $request, Partner $partner)
    {
        $validated = $request->validate([
            'partner_tier_id' => 'required|exists:partner_tiers,id',
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'website' => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'is_active' => 'boolean',
            'partnership_start_date' => 'nullable|date',
            'partnership_end_date' => 'nullable|date|after_or_equal:partnership_start_date',
        ]);

        if ($request->hasFile('logo')) {
            // Supprimer l'ancien logo s'il existe
            if ($partner->logo) {
                Storage::disk('public')->delete($partner->logo);
            }
            $validated['logo'] = $request->file('logo')->store('partners', 'public');
        }

        $partner->update($validated);

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partenaire mis à jour avec succès.');
    }

    public function destroy(Partner $partner)
    {
        // Supprimer le logo s'il existe
        if ($partner->logo) {
            Storage::disk('public')->delete($partner->logo);
        }

        $partner->delete();

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partenaire supprimé avec succès.');
    }

    public function toggleActive(Partner $partner)
    {
        $partner->update(['is_active' => !$partner->is_active]);

        return back()->with('success', 'Statut du partenaire mis à jour.');
    }
}
