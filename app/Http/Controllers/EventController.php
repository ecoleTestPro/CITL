<?php

namespace App\Http\Controllers;

use App\Repositories\Event\EventRepository;
use Inertia\Inertia;

class EventController extends Controller
{
    protected $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    /**
     * Display active events for public view.
     */
    public function index()
    {
        $events = $this->eventRepository->getAllActive();

        return Inertia::render('public/events', [
            'events' => $events,
        ]);
    }
}
