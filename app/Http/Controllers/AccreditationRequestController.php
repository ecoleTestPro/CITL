<?php

namespace App\Http\Controllers;

use App\Mail\AccreditationRequestMail;
use App\Models\AccreditationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AccreditationRequestController extends Controller
{
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

        // Send email notification
        try {
            // Get the recipient email from config, fallback to default
            $recipientEmail = config('mail.registration_recipient', 'keraste38@gmail.com');

            Mail::to($recipientEmail)->send(new AccreditationRequestMail($accreditationRequest));

            // Optionally send confirmation email to the organization
            Mail::to($accreditationRequest->email)->send(new AccreditationRequestMail($accreditationRequest, true));

            return redirect()->back()->with('success', 'Demande d\'accréditation envoyée avec succès ! Nous vous contacterons bientôt.');
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Failed to send accreditation request email: '.$e->getMessage());

            return redirect()->back()->with('error', 'Demande enregistrée mais l\'envoi de l\'email a échoué. Nous vous contacterons sous peu.');
        }
    }
}
