<?php

namespace App\Http\Controllers;

use App\Mail\AccreditationRequestMail;
use App\Models\AccreditationRequest;
use App\Models\EmailLog;
use App\Traits\EmailRecipientTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccreditationRequestController extends Controller
{
    use EmailRecipientTrait;

    /**
     * Show the accreditation request page
     */
    public function index()
    {
        return Inertia::render('public/training/accreditation-request');
    }

    /**
     * Store a new accreditation request
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'city' => 'required|string|max:255',
            'company_address' => 'required|string',
            'contact_person' => 'required|string|max:255',
            'website' => 'nullable|url|max:255',
            'years_in_business' => 'required|integer|min:0',
            'number_of_trainers' => 'required|integer|min:1',
            'training_facilities' => 'required|string',
            'additional_info' => 'nullable|string',
        ]);

        // Create the accreditation request
        $accreditationRequest = AccreditationRequest::create($validated);

        // Send emails with logging
        $emails = [
            [
                'email' => $this->getRecipientEmail(),
                'mailable' => new AccreditationRequestMail($accreditationRequest),
                'name' => 'CITL Admin',
                'is_confirmation' => false,
            ],
            [
                'email' => $accreditationRequest->email,
                'mailable' => new AccreditationRequestMail($accreditationRequest, true),
                'name' => $accreditationRequest->contact_person,
                'is_confirmation' => true,
            ],
        ];

        $logs = $this->sendMultipleEmailsWithLog(
            $emails,
            EmailLog::REQUEST_TYPE_ACCREDITATION,
            (string) $accreditationRequest->id,
            [
                'company_name' => $accreditationRequest->company_name,
                'contact_person' => $accreditationRequest->contact_person,
            ]
        );

        // Check if at least one email was sent successfully
        $hasSentEmail = collect($logs)->contains(fn ($log) => $log->status === EmailLog::STATUS_SENT);

        if ($hasSentEmail) {
            return redirect()->back()->with('success', 'Demande d\'accréditation envoyée avec succès ! Nous vous contacterons bientôt.');
        }

        return redirect()->back()->with('error', 'Demande enregistrée mais l\'envoi de l\'email a échoué. Nous vous contacterons sous peu.');
    }
}
