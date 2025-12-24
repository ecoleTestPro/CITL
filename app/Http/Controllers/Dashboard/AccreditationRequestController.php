<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\AccreditationRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccreditationRequestController extends Controller
{
    /**
     * Display a listing of accreditation requests
     */
    public function index(Request $request)
    {
        $query = AccreditationRequest::query()->orderByDesc('created_at');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $requests = $query->get();

        return Inertia::render('dashboard/accreditation-requests/index', [
            'requests' => $requests,
        ]);
    }

    /**
     * Update the status of an accreditation request
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $accreditationRequest = AccreditationRequest::findOrFail($id);
        $accreditationRequest->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Statut mis à jour avec succès');
    }

    /**
     * Delete an accreditation request
     */
    public function destroy($id)
    {
        $accreditationRequest = AccreditationRequest::findOrFail($id);
        $accreditationRequest->delete();

        return redirect()->back()->with('success', 'Demande supprimée avec succès');
    }
}
