<?php

namespace App\Http\Controllers;

use App\Mail\CertifiedTesterRegistrationMail;
use App\Models\EmailLog;
use App\Models\Registration\CertifiedTesterRegistration;
use App\Traits\EmailRecipientTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertifiedTesterRegistrationController extends Controller
{
    use EmailRecipientTrait;

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

        // Send emails with logging
        $emails = [
            [
                'email' => $this->getRecipientEmail(),
                'mailable' => new CertifiedTesterRegistrationMail($registration),
                'name' => 'CITL Admin',
                'is_confirmation' => false,
            ],
            [
                'email' => $registration->email,
                'mailable' => new CertifiedTesterRegistrationMail($registration, true),
                'name' => $registration->full_name,
                'is_confirmation' => true,
            ],
        ];

        $logs = $this->sendMultipleEmailsWithLog(
            $emails,
            EmailLog::REQUEST_TYPE_CERTIFIED_TESTER,
            (string) $registration->id,
            [
                'full_name' => $registration->full_name,
                'certification' => $registration->certification_obtained,
            ]
        );

        // Check if at least one email was sent successfully
        $hasSentEmail = collect($logs)->contains(fn ($log) => $log->status === EmailLog::STATUS_SENT);

        if ($hasSentEmail) {
            return redirect()->back()->with('success', 'Votre demande d\'inscription a été envoyée avec succès !');
        }

        return redirect()->back()->with('success', 'Votre demande d\'inscription a été enregistrée. Nous vous contacterons bientôt.');
    }
}
