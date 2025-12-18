<?php

namespace App\Http\Controllers;

use App\Mail\CertifiedTesterRegistrationMail;
use App\Models\Registration\CertifiedTesterRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class CertifiedTesterRegistrationController extends Controller
{
    /**
     * Show the certified testers list/search page
     */
    public function index()
    {
        return Inertia::render('public/registration/certified-testers-list');
    }

    /**
     * Search for certified testers
     */
    public function search(Request $request)
    {
        $name = $request->input('name');
        $certificateNumber = $request->input('certificate_number');

        // Only search if at least one parameter is provided
        if (empty($name) && empty($certificateNumber)) {
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Please provide a search term',
            ]);
        }

        $query = CertifiedTesterRegistration::approved();

        if (! empty($name)) {
            $query->where('full_name', 'like', '%'.$name.'%');
        }

        if (! empty($certificateNumber)) {
            $query->where('certificate_number', 'like', '%'.$certificateNumber.'%');
        }

        $testers = $query->select([
            'id',
            'full_name',
            'certification_obtained',
            'certificate_number',
            'exam_date',
        ])->orderBy('full_name')->get();

        return response()->json([
            'success' => true,
            'data' => $testers,
            'message' => $testers->count() > 0 ? 'Testers found' : 'No testers found',
        ]);
    }

    /**
     * Store a new certified tester registration
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'consent' => 'required|accepted',
            'full_name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'date_of_birth' => 'required|date|before:today',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'certification_obtained' => 'required|string|max:255',
            'certificate_number' => 'required|string|max:100',
            'test_center' => 'required|string|max:255',
            'exam_date' => 'required|date|before_or_equal:today',
        ]);

        // Create the registration
        $registration = CertifiedTesterRegistration::create([
            'full_name' => $validated['full_name'],
            'address' => $validated['address'],
            'date_of_birth' => $validated['date_of_birth'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'certification_obtained' => $validated['certification_obtained'],
            'certificate_number' => $validated['certificate_number'],
            'test_center' => $validated['test_center'],
            'exam_date' => $validated['exam_date'],
            'consent' => true,
            'status' => 'pending',
        ]);

        // Send email notification
        try {
            // Get the recipient email from config, fallback to default
            $recipientEmail = config('mail.registration_recipient', 'contact@citl.ci');

            Mail::to($recipientEmail)->send(new CertifiedTesterRegistrationMail($registration));

            // Send confirmation email to the applicant
            Mail::to($registration->email)->send(new CertifiedTesterRegistrationMail($registration, true));

            return redirect()->back()->with('success', 'Votre demande d\'inscription a été envoyée avec succès !');
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Failed to send certified tester registration email: '.$e->getMessage());

            return redirect()->back()->with('success', 'Votre demande d\'inscription a été enregistrée. Nous vous contacterons bientôt.');
        }
    }
}
