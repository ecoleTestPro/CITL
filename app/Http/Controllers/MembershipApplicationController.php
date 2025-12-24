<?php

namespace App\Http\Controllers;

use App\Mail\MembershipApplicationMail;
use App\Models\EmailLog;
use App\Repositories\MembershipApplicationRepository;
use App\Traits\EmailRecipientTrait;
use Illuminate\Http\Request;

class MembershipApplicationController extends Controller
{
    use EmailRecipientTrait;

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

        // Send emails with logging
        $emails = [
            [
                'email' => $this->getRecipientEmail(),
                'mailable' => new MembershipApplicationMail($application),
                'name' => 'CITL Admin',
                'is_confirmation' => false,
            ],
            [
                'email' => $application->email,
                'mailable' => new MembershipApplicationMail($application),
                'name' => $application->first_name . ' ' . $application->surname,
                'is_confirmation' => true,
            ],
        ];

        $logs = $this->sendMultipleEmailsWithLog(
            $emails,
            EmailLog::REQUEST_TYPE_MEMBERSHIP,
            (string) $application->id,
            [
                'applicant_name' => $application->first_name . ' ' . $application->surname,
                'membership_level' => $application->membership_level,
            ]
        );

        // Check if at least one email was sent successfully
        $hasSentEmail = collect($logs)->contains(fn ($log) => $log->status === EmailLog::STATUS_SENT);

        if ($hasSentEmail) {
            return redirect()->back()->with('success', 'Demande d\'adhésion envoyée avec succès ! Vous recevrez un email de confirmation.');
        }

        return redirect()->back()->with('error', 'Demande enregistrée mais l\'envoi de l\'email a échoué. Nous vous contactons sous peu.');
    }
}
