<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Training\AccreditedOrganizationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AccreditedOrganizationController extends Controller
{
    protected $organizationRepo;

    public function __construct(AccreditedOrganizationRepository $organizationRepo)
    {
        $this->organizationRepo = $organizationRepo;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = [
            'country' => $request->get('country'),
            'search' => $request->get('search'),
            'is_active' => $request->get('is_active'),
        ];

        $organizations = $this->organizationRepo->getPaginated(15, array_filter($filters, function ($value) {
            return $value !== null && $value !== '';
        }));

        $countries = $this->organizationRepo->getDistinctCountries();

        return Inertia::render('dashboard/accredited-organizations/index', [
            'organizations' => $organizations,
            'filters' => $filters,
            'countries' => $countries,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('organizations', 'public');
        }

        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['order'] = $validated['order'] ?? 0;

        $this->organizationRepo->create($validated);

        return redirect()->route('dashboard.accredited-organizations.index')
            ->with('success', 'Organisme accrédité créé avec succès.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        $organization = $this->organizationRepo->find($id);

        if (!$organization) {
            return redirect()->route('dashboard.accredited-organizations.index')
                ->with('error', 'Organisme non trouvé.');
        }

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($organization->logo) {
                Storage::disk('public')->delete($organization->logo);
            }
            $validated['logo'] = $request->file('logo')->store('organizations', 'public');
        }

        $this->organizationRepo->update($id, $validated);

        return redirect()->route('dashboard.accredited-organizations.index')
            ->with('success', 'Organisme accrédité mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $organization = $this->organizationRepo->find($id);

        if (!$organization) {
            return redirect()->route('dashboard.accredited-organizations.index')
                ->with('error', 'Organisme non trouvé.');
        }

        // Delete logo if exists
        if ($organization->logo) {
            Storage::disk('public')->delete($organization->logo);
        }

        $this->organizationRepo->delete($id);

        return redirect()->route('dashboard.accredited-organizations.index')
            ->with('success', 'Organisme accrédité supprimé avec succès.');
    }
}
