<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use App\Traits\EmailRecipientTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

        try {
            // Send email to the site admin
            Mail::to($this->getRecipientEmail())
                ->send(new ContactMessage(
                    civility: $validated['civility'],
                    senderName: $validated['name'],
                    senderEmail: $validated['email'],
                    senderPhone: $validated['phone'] ?? '',
                    company: $validated['company'] ?? '',
                    contactSubject: $validated['subject'],
                    messageContent: $validated['message'],
                ));

            return back()->with('success', 'Message envoyé avec succès!');
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de l\'envoi du message.');
        }
    }
}
