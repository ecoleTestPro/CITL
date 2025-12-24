<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ContactRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactRequestController extends Controller
{
    /**
     * Display a listing of contact messages
     */
    public function index(Request $request)
    {
        $query = ContactRequest::query()->orderByDesc('created_at');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $messages = $query->get();

        return Inertia::render('dashboard/contact-messages/index', [
            'messages' => $messages,
        ]);
    }

    /**
     * Show a single contact message
     */
    public function show($id)
    {
        $message = ContactRequest::findOrFail($id);

        // Mark as read when viewing
        $message->markAsRead();

        return response()->json([
            'success' => true,
            'data' => $message,
        ]);
    }

    /**
     * Update the status of a contact message
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,read,replied,archived',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $message = ContactRequest::findOrFail($id);

        $updateData = ['status' => $validated['status']];

        if (isset($validated['admin_notes'])) {
            $updateData['admin_notes'] = $validated['admin_notes'];
        }

        if ($validated['status'] === 'read' && !$message->read_at) {
            $updateData['read_at'] = now();
        }

        if ($validated['status'] === 'replied') {
            $updateData['replied_at'] = now();
        }

        $message->update($updateData);

        return redirect()->back()->with('success', 'Statut mis à jour avec succès');
    }

    /**
     * Delete a contact message
     */
    public function destroy($id)
    {
        $message = ContactRequest::findOrFail($id);
        $message->delete();

        return redirect()->back()->with('success', 'Message supprimé avec succès');
    }
}
