<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Event\EventRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    protected $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    /**
     * Display a listing of the events.
     */
    public function index()
    {
        $events = $this->eventRepository->getAllOrdered();

        return Inertia::render('dashboard/events/index', [
            'events' => $events,
        ]);
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'location' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'is_active' => 'boolean',
        ]);

        $event = $this->eventRepository->create($validated);

        return redirect()->route('admin.events.index')
            ->with('success', 'Événement créé avec succès.');
    }

    /**
     * Update the specified event in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'location' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'is_active' => 'boolean',
        ]);

        $event = $this->eventRepository->update($id, $validated);

        if (! $event) {
            return redirect()->route('admin.events.index')
                ->with('error', 'Événement non trouvé.');
        }

        return redirect()->route('admin.events.index')
            ->with('success', 'Événement mis à jour avec succès.');
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy($id)
    {
        $result = $this->eventRepository->delete($id);

        if (! $result) {
            return redirect()->route('admin.events.index')
                ->with('error', 'Événement non trouvé.');
        }

        return redirect()->route('admin.events.index')
            ->with('success', 'Événement supprimé avec succès.');
    }

    /**
     * Toggle event active status.
     */
    public function toggleActive($id)
    {
        $event = $this->eventRepository->toggleActive($id);

        if (! $event) {
            return redirect()->route('admin.events.index')
                ->with('error', 'Événement non trouvé.');
        }

        return redirect()->route('admin.events.index')
            ->with('success', 'Statut de l\'événement mis à jour.');
    }
}
