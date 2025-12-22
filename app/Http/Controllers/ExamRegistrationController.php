<?php

namespace App\Http\Controllers;

use App\Mail\ExamRegistrationMail;
use App\Repositories\ExamRegistrationRepository;
use App\Traits\EmailRecipientTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ExamRegistrationController extends Controller
{
    use EmailRecipientTrait;

    public function __construct(
        private ExamRegistrationRepository $examRegistrationRepository
    ) {}

    /**
     * Show the exam registration page
     */
    public function index()
    {
        return Inertia::render('public/exams/exam-registration');
    }

    /**
     * Store a new exam registration
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'purchase_type' => 'required|in:individual,group',
            'exam_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'address_line1' => 'required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'exam_format' => 'required|in:online',
            'register_in_registry' => 'required|in:yes,no',
        ]);

        // Create the registration
        $registration = $this->examRegistrationRepository->createRegistration($validated);

        // Send email notification
        try {
            // Get the recipient email based on environment
            $recipientEmail = $this->getRecipientEmail();

            Mail::to($recipientEmail)->send(new ExamRegistrationMail($registration));

            // Optionally send confirmation email to the candidate
            Mail::to($registration->email)->send(new ExamRegistrationMail($registration));

            return redirect()->back()->with('success', 'Inscription envoyée avec succès ! Vous recevrez un email de confirmation.');
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Failed to send exam registration email: '.$e->getMessage());

            return redirect()->back()->with('error', 'Inscription enregistrée mais l\'envoi de l\'email a échoué. Nous vous contactons sous peu.');
        }
    }
}
