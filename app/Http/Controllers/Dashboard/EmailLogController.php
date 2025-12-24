<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\EmailLog;
use App\Services\EmailLogService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailLogController extends Controller
{
    public function __construct(
        private EmailLogService $emailLogService
    ) {}

    /**
     * Display a listing of email logs
     */
    public function index(Request $request)
    {
        $query = EmailLog::query()->orderByDesc('created_at');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by request type
        if ($request->filled('request_type')) {
            $query->where('request_type', $request->request_type);
        }

        // Filter by recipient email
        if ($request->filled('recipient_email')) {
            $query->where('recipient_email', 'like', '%' . $request->recipient_email . '%');
        }

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $logs = $query->paginate(50);

        // Get statistics
        $stats = $this->emailLogService->getStats();

        return Inertia::render('dashboard/email-logs/index', [
            'logs' => $logs,
            'stats' => $stats,
            'requestTypes' => [
                EmailLog::REQUEST_TYPE_EXAM_REGISTRATION => 'Inscription Examen',
                EmailLog::REQUEST_TYPE_ACCREDITATION => 'Demande Accréditation',
                EmailLog::REQUEST_TYPE_MEMBERSHIP => 'Demande Adhésion',
                EmailLog::REQUEST_TYPE_CERTIFIED_TESTER => 'Inscription Testeur Certifié',
                EmailLog::REQUEST_TYPE_CONTACT => 'Message Contact',
            ],
            'statuses' => [
                EmailLog::STATUS_PENDING => 'En attente',
                EmailLog::STATUS_SENT => 'Envoyé',
                EmailLog::STATUS_FAILED => 'Échoué',
            ],
        ]);
    }

    /**
     * Show details of a specific email log
     */
    public function show($id)
    {
        $log = EmailLog::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $log,
        ]);
    }
}
