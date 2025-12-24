<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use App\Models\ContactRequest;
use App\Models\EmailLog;
use App\Traits\EmailRecipientTrait;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    use EmailRecipientTrait;

    /**
     * Send contact form email
     */
    public function send(Request $request)
    {
        $validated = $request->validate([
            'civility' => 'required|string|in:mr,mrs,miss',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        // Save the contact message to database
        $contactRequest = ContactRequest::create([
            'civility' => $validated['civility'],
            'sender_name' => $validated['name'],
            'sender_email' => $validated['email'],
            'sender_phone' => $validated['phone'] ?? null,
            'company' => $validated['company'] ?? null,
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'status' => ContactRequest::STATUS_PENDING,
        ]);

        // Send email with logging
        $mailable = new ContactMessage(
            civility: $validated['civility'],
            senderName: $validated['name'],
            senderEmail: $validated['email'],
            senderPhone: $validated['phone'] ?? '',
            company: $validated['company'] ?? '',
            contactSubject: $validated['subject'],
            messageContent: $validated['message'],
        );

        $emailLog = $this->sendEmailWithLog(
            $this->getRecipientEmail(),
            $mailable,
            EmailLog::REQUEST_TYPE_CONTACT,
            (string) $contactRequest->id,
            [
                'sender_name' => $validated['name'],
                'sender_email' => $validated['email'],
                'subject' => $validated['subject'],
            ],
            'CITL Admin'
        );

        if ($emailLog->status === EmailLog::STATUS_SENT) {
            return back()->with('success', 'Message envoyé avec succès!');
        }

        return back()->with('error', 'Message enregistré mais l\'envoi de l\'email a échoué. Nous vous contacterons sous peu.');
    }
}
