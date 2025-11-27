<?php

namespace App\Http\Controllers;

use App\Mail\MembershipApplicationMail;
use App\Repositories\MembershipApplicationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MembershipApplicationController extends Controller
{
    public function __construct(
        private MembershipApplicationRepository $membershipApplicationRepository
    ) {}

    /**
     * Store a new membership application
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'membership_type' => 'required|in:new,renewal',
            'first_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'years_of_experience' => 'required|string',
            'membership_level' => 'required|in:student,professional,expert',
            'qualification' => 'nullable|string|max:255',
        ]);

        // Create the application
        $application = $this->membershipApplicationRepository->createApplication($validated);

        // Send email notification
        try {
            // Get the recipient email from config, fallback to default
            $recipientEmail = config('mail.membership_recipient', 'keraste38@gmail.com');

            Mail::to($recipientEmail)->send(new MembershipApplicationMail($application));

            // Optionally send confirmation email to the applicant
            Mail::to($application->email)->send(new MembershipApplicationMail($application));

            return redirect()->back()->with('success', 'Demande d\'adhésion envoyée avec succès ! Vous recevrez un email de confirmation.');
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Failed to send membership application email: ' . $e->getMessage());

            return redirect()->back()->with('error', 'Demande enregistrée mais l\'envoi de l\'email a échoué. Nous vous contactons sous peu.');
        }
    }
}
