<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\ExamRegistrationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamRegistrationController extends Controller
{
    public function __construct(
        private ExamRegistrationRepository $examRegistrationRepository
    ) {}

    /**
     * Display a listing of exam registrations
     */
    public function index()
    {
        $registrations = $this->examRegistrationRepository->getAllRegistrations();

        return Inertia::render('dashboard/exam-registrations/index', [
            'registrations' => $registrations,
        ]);
    }

    /**
     * Update the status of an exam registration
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $registration = $this->examRegistrationRepository->updateStatus($id, $validated['status']);

        return redirect()->back()->with('success', 'Statut mis à jour avec succès');
    }

    /**
     * Delete an exam registration
     */
    public function destroy($id)
    {
        $this->examRegistrationRepository->delete($id);

        return redirect()->back()->with('success', 'Inscription supprimée avec succès');
    }
}
