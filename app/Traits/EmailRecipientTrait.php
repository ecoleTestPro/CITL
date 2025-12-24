<?php

namespace App\Traits;

use App\Models\EmailLog;
use App\Services\EmailLogService;
use Illuminate\Mail\Mailable;

/**
 * Trait for handling email recipients and logging
 */
trait EmailRecipientTrait
{
    /**
     * The official CITL contact email (production)
     */
    protected const CITL_CONTACT_EMAIL = 'contact@citl-istqb.org';

    /**
     * The development/local email for testing
     */
    protected const DEV_CONTACT_EMAIL = 'keraste38@gmail.com';

    /**
     * Production domain
     */
    protected const PRODUCTION_DOMAIN = 'citl-istqb.org';

    /**
     * Get the recipient email for admin notifications
     * Returns production email if in production environment OR on production domain
     *
     * @return string
     */
    protected function getRecipientEmail(): string
    {
        return $this->isProductionEnvironment()
            ? self::CITL_CONTACT_EMAIL
            : self::DEV_CONTACT_EMAIL;
    }

    /**
     * Check if we're in a production environment
     * Based on APP_ENV and/or the current domain
     *
     * @return bool
     */
    protected function isProductionEnvironment(): bool
    {
        // Check APP_ENV
        if (app()->environment('production')) {
            return true;
        }

        // Check domain from APP_URL
        $appUrl = config('app.url', '');
        if (str_contains($appUrl, self::PRODUCTION_DOMAIN)) {
            return true;
        }

        // Check current request host (if available)
        if (request() && request()->getHost()) {
            $host = request()->getHost();
            if (str_contains($host, self::PRODUCTION_DOMAIN)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Send an email with logging
     *
     * @param string $recipientEmail
     * @param Mailable $mailable
     * @param string $requestType
     * @param string|null $mailableId
     * @param array $metadata
     * @param string|null $recipientName
     * @return EmailLog
     */
    protected function sendEmailWithLog(
        string $recipientEmail,
        Mailable $mailable,
        string $requestType,
        ?string $mailableId = null,
        array $metadata = [],
        ?string $recipientName = null
    ): EmailLog {
        $emailLogService = app(EmailLogService::class);

        return $emailLogService->sendAndLog(
            $recipientEmail,
            $mailable,
            $requestType,
            $mailableId,
            $metadata,
            $recipientName
        );
    }

    /**
     * Send multiple emails with logging (admin + confirmation)
     *
     * @param array $emails
     * @param string $requestType
     * @param string|null $mailableId
     * @param array $metadata
     * @return array
     */
    protected function sendMultipleEmailsWithLog(
        array $emails,
        string $requestType,
        ?string $mailableId = null,
        array $metadata = []
    ): array {
        $emailLogService = app(EmailLogService::class);

        return $emailLogService->sendMultipleAndLog(
            $emails,
            $requestType,
            $mailableId,
            $metadata
        );
    }
}
