<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\AccreditationRequest;
use App\Models\Blog\Blog;
use App\Models\Certification\Certification;
use App\Models\Event;
use App\Models\ExamRegistration;
use App\Models\Glossary;
use App\Models\MembershipApplication;
use App\Models\Registration\CertifiedTesterRegistration;
use App\Models\Training\AccreditedOrganization;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'exam_registrations' => [
                'total' => ExamRegistration::count(),
                'pending' => ExamRegistration::where('status', 'pending')->count(),
            ],
            'membership_applications' => [
                'total' => MembershipApplication::count(),
                'pending' => MembershipApplication::where('status', 'pending')->count(),
            ],
            'accreditation_requests' => [
                'total' => AccreditationRequest::count(),
                'pending' => AccreditationRequest::where('status', 'pending')->count(),
            ],
            'certified_testers' => [
                'total' => CertifiedTesterRegistration::count(),
                'pending' => CertifiedTesterRegistration::where('status', 'pending')->count(),
            ],
            'content' => [
                'certifications' => Certification::count(),
                'accredited_orgs' => AccreditedOrganization::count(),
                'articles' => Blog::count(),
                'events' => Event::where('is_active', true)->count(),
                'glossary_terms' => Glossary::count(),
            ],
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }
}
