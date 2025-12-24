<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Registration\CertifiedTesterRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertifiedTesterRegistrationController extends Controller
{
    /**
     * Display a listing of certified tester registrations
     */
    public function index(Request $request)
    {
        $query = CertifiedTesterRegistration::query()->orderByDesc('created_at');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $registrations = $query->get();

        return Inertia::render('dashboard/certified-tester-registrations/index', [
            'registrations' => $registrations,
        ]);
    }

    /**
     * Update the status of a certified tester registration
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $registration = CertifiedTesterRegistration::findOrFail($id);

        $updateData = ['status' => $validated['status']];

        if (isset($validated['admin_notes'])) {
            $updateData['admin_notes'] = $validated['admin_notes'];
        }

        if ($validated['status'] === 'approved') {
            $updateData['approved_at'] = now();
        }

        $registration->update($updateData);

        return redirect()->back()->with('success', 'Statut mis à jour avec succès');
    }

    /**
     * Delete a certified tester registration
     */
    public function destroy($id)
    {
        $registration = CertifiedTesterRegistration::findOrFail($id);
        $registration->delete();

        return redirect()->back()->with('success', 'Inscription supprimée avec succès');
    }
}
