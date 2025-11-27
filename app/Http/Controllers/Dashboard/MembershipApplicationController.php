<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\MembershipApplicationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MembershipApplicationController extends Controller
{
    public function __construct(
        private MembershipApplicationRepository $membershipApplicationRepository
    ) {}

    /**
     * Display a listing of membership applications
     */
    public function index()
    {
        $applications = $this->membershipApplicationRepository->getAllApplications();

        return Inertia::render('dashboard/membership-applications/index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Update the status of a membership application
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $application = $this->membershipApplicationRepository->updateStatus($id, $validated['status']);

        return redirect()->back()->with('success', 'Statut mis à jour avec succès');
    }

    /**
     * Delete a membership application
     */
    public function destroy($id)
    {
        $this->membershipApplicationRepository->delete($id);

        return redirect()->back()->with('success', 'Demande supprimée avec succès');
    }
}
