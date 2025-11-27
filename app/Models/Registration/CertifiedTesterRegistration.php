<?php

namespace App\Models\Registration;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CertifiedTesterRegistration extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'address',
        'date_of_birth',
        'email',
        'phone',
        'certification_obtained',
        'certificate_number',
        'test_center',
        'exam_date',
        'consent',
        'status',
        'admin_notes',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'exam_date' => 'date',
        'consent' => 'boolean',
        'approved_at' => 'datetime',
    ];

    /**
     * Get the certification label
     */
    public function getCertificationLabelAttribute(): string
    {
        $certifications = [
            'foundation' => 'ISTQB Certified Tester Foundation Level (CTFL)',
            'advanced-test-analyst' => 'ISTQB Advanced Level Test Analyst (CTAL-TA)',
            'advanced-test-manager' => 'ISTQB Advanced Level Test Manager (CTAL-TM)',
            'advanced-technical-test-analyst' => 'ISTQB Advanced Level Technical Test Analyst (CTAL-TTA)',
            'agile-tester' => 'ISTQB Certified Tester Foundation Level - Agile Tester',
            'test-automation-engineer' => 'ISTQB Advanced Level Test Automation Engineer (CTAL-TAE)',
            'security-tester' => 'ISTQB Advanced Level Security Tester (CTAL-SEC)',
            'performance-testing' => 'ISTQB Certified Tester Performance Testing',
            'mobile-application-testing' => 'ISTQB Certified Tester Mobile Application Testing',
            'ai-testing' => 'ISTQB Certified Tester AI Testing',
        ];

        return $certifications[$this->certification_obtained] ?? $this->certification_obtained;
    }

    /**
     * Get the test center label
     */
    public function getTestCenterLabelAttribute(): string
    {
        $centers = [
            'citl-abidjan' => 'CITL - Abidjan',
            'pearson-vue' => 'Pearson VUE',
            'isqi-remote' => 'iSQI - Remote Exam',
            'other' => 'Autre',
        ];

        return $centers[$this->test_center] ?? $this->test_center;
    }

    /**
     * Scope for pending registrations
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for approved registrations
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Approve the registration
     */
    public function approve(?string $notes = null): bool
    {
        return $this->update([
            'status' => 'approved',
            'approved_at' => now(),
            'admin_notes' => $notes,
        ]);
    }

    /**
     * Reject the registration
     */
    public function reject(?string $notes = null): bool
    {
        return $this->update([
            'status' => 'rejected',
            'admin_notes' => $notes,
        ]);
    }
}
