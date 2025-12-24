<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'mailable_type',
        'mailable_id',
        'request_type',
        'recipient_email',
        'recipient_name',
        'sender_email',
        'sender_name',
        'subject',
        'status',
        'error_message',
        'metadata',
        'sent_at',
    ];

    protected $casts = [
        'metadata' => 'array',
        'sent_at' => 'datetime',
    ];

    /**
     * Request type constants
     */
    public const REQUEST_TYPE_EXAM_REGISTRATION = 'exam_registration';
    public const REQUEST_TYPE_ACCREDITATION = 'accreditation';
    public const REQUEST_TYPE_MEMBERSHIP = 'membership';
    public const REQUEST_TYPE_CERTIFIED_TESTER = 'certified_tester';
    public const REQUEST_TYPE_CONTACT = 'contact';

    /**
     * Status constants
     */
    public const STATUS_PENDING = 'pending';
    public const STATUS_SENT = 'sent';
    public const STATUS_FAILED = 'failed';

    /**
     * Scope: Filter by request type
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('request_type', $type);
    }

    /**
     * Scope: Filter by status
     */
    public function scopeWithStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope: Successfully sent emails
     */
    public function scopeSent($query)
    {
        return $query->where('status', self::STATUS_SENT);
    }

    /**
     * Scope: Failed emails
     */
    public function scopeFailed($query)
    {
        return $query->where('status', self::STATUS_FAILED);
    }

    /**
     * Mark as sent
     */
    public function markAsSent(): void
    {
        $this->update([
            'status' => self::STATUS_SENT,
            'sent_at' => now(),
        ]);
    }

    /**
     * Mark as failed
     */
    public function markAsFailed(string $errorMessage): void
    {
        $this->update([
            'status' => self::STATUS_FAILED,
            'error_message' => $errorMessage,
        ]);
    }

    /**
     * Get human-readable request type
     */
    public function getRequestTypeLabelAttribute(): string
    {
        return match ($this->request_type) {
            self::REQUEST_TYPE_EXAM_REGISTRATION => 'Inscription Examen',
            self::REQUEST_TYPE_ACCREDITATION => 'Demande Accréditation',
            self::REQUEST_TYPE_MEMBERSHIP => 'Demande Adhésion',
            self::REQUEST_TYPE_CERTIFIED_TESTER => 'Inscription Testeur Certifié',
            self::REQUEST_TYPE_CONTACT => 'Message Contact',
            default => $this->request_type,
        };
    }

    /**
     * Get human-readable status
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            self::STATUS_PENDING => 'En attente',
            self::STATUS_SENT => 'Envoyé',
            self::STATUS_FAILED => 'Échoué',
            default => $this->status,
        };
    }
}
