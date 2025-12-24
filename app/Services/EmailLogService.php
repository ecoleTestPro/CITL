<?php

namespace App\Services;

use App\Models\EmailLog;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class EmailLogService
{
    /**
     * Send an email and log the result
     *
     * @param string $recipientEmail
     * @param Mailable $mailable
     * @param string $requestType One of EmailLog::REQUEST_TYPE_* constants
     * @param string|null $mailableId ID of the associated model
     * @param array $metadata Additional data to store
     * @param string|null $recipientName
     * @return EmailLog
     */
    public function sendAndLog(
        string $recipientEmail,
        Mailable $mailable,
        string $requestType,
        ?string $mailableId = null,
        array $metadata = [],
        ?string $recipientName = null
    ): EmailLog {
        // Create the log entry first
        $emailLog = EmailLog::create([
            'mailable_type' => get_class($mailable),
            'mailable_id' => $mailableId,
            'request_type' => $requestType,
            'recipient_email' => $recipientEmail,
            'recipient_name' => $recipientName,
            'sender_email' => config('mail.from.address'),
            'sender_name' => config('mail.from.name'),
            'subject' => $this->extractSubject($mailable),
            'status' => EmailLog::STATUS_PENDING,
            'metadata' => $metadata,
        ]);

        try {
            Mail::to($recipientEmail)->send($mailable);

            $emailLog->markAsSent();

            Log::channel('mail')->info('Email sent successfully', [
                'log_id' => $emailLog->id,
                'recipient' => $recipientEmail,
                'request_type' => $requestType,
                'subject' => $emailLog->subject,
            ]);
        } catch (Throwable $e) {
            $errorMessage = $e->getMessage();
            $emailLog->markAsFailed($errorMessage);

            Log::channel('mail')->error('Email sending failed', [
                'log_id' => $emailLog->id,
                'recipient' => $recipientEmail,
                'request_type' => $requestType,
                'error' => $errorMessage,
            ]);
        }

        return $emailLog;
    }

    /**
     * Send multiple emails for a single request (admin + confirmation)
     *
     * @param array $emails Array of ['email' => string, 'mailable' => Mailable, 'name' => string|null]
     * @param string $requestType
     * @param string|null $mailableId
     * @param array $metadata
     * @return array Array of EmailLog objects
     */
    public function sendMultipleAndLog(
        array $emails,
        string $requestType,
        ?string $mailableId = null,
        array $metadata = []
    ): array {
        $logs = [];

        foreach ($emails as $emailData) {
            $logs[] = $this->sendAndLog(
                $emailData['email'],
                $emailData['mailable'],
                $requestType,
                $mailableId,
                array_merge($metadata, [
                    'is_confirmation' => $emailData['is_confirmation'] ?? false,
                ]),
                $emailData['name'] ?? null
            );
        }

        return $logs;
    }

    /**
     * Extract subject from mailable
     */
    private function extractSubject(Mailable $mailable): string
    {
        // Build the mailable to get the subject
        try {
            $reflection = new \ReflectionClass($mailable);
            if ($reflection->hasProperty('subject')) {
                $property = $reflection->getProperty('subject');
                $property->setAccessible(true);
                $subject = $property->getValue($mailable);
                if ($subject) {
                    return $subject;
                }
            }

            // Try to get subject from envelope if available
            if (method_exists($mailable, 'envelope')) {
                $envelope = $mailable->envelope();
                return $envelope->subject ?? 'No Subject';
            }
        } catch (Throwable $e) {
            // Fall back to class name
        }

        return class_basename($mailable);
    }

    /**
     * Get statistics for email logs
     */
    public function getStats(?\DateTime $from = null, ?\DateTime $to = null): array
    {
        $query = EmailLog::query();

        if ($from) {
            $query->where('created_at', '>=', $from);
        }

        if ($to) {
            $query->where('created_at', '<=', $to);
        }

        return [
            'total' => $query->count(),
            'sent' => (clone $query)->sent()->count(),
            'failed' => (clone $query)->failed()->count(),
            'by_type' => $query->selectRaw('request_type, COUNT(*) as count')
                ->groupBy('request_type')
                ->pluck('count', 'request_type')
                ->toArray(),
        ];
    }
}
