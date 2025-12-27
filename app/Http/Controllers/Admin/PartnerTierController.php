<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner\PartnerTier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnerTierController extends Controller
{
    public function index()
    {
        $tiers = PartnerTier::withCount('partners')
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/partner-tiers/index', [
            'tiers' => $tiers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
            'color' => 'required|string|max:7',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        PartnerTier::create($validated);

        return redirect()->route('admin.partner-tiers.index')
            ->with('success', 'Catégorie de partenaire créée avec succès.');
    }

    public function update(Request $request, PartnerTier $partnerTier)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
            'color' => 'required|string|max:7',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $partnerTier->update($validated);

        return redirect()->route('admin.partner-tiers.index')
            ->with('success', 'Catégorie de partenaire mise à jour avec succès.');
    }

    public function destroy(PartnerTier $partnerTier)
    {
        if ($partnerTier->partners()->count() > 0) {
            return redirect()->route('admin.partner-tiers.index')
                ->with('error', 'Impossible de supprimer cette catégorie car elle contient des partenaires.');
        }

        $partnerTier->delete();

        return redirect()->route('admin.partner-tiers.index')
            ->with('success', 'Catégorie de partenaire supprimée avec succès.');
    }

    public function toggleActive(PartnerTier $partnerTier)
    {
        $partnerTier->update(['is_active' => !$partnerTier->is_active]);

        return back()->with('success', 'Statut de la catégorie mis à jour.');
    }
}
