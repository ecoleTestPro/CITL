<?php

namespace App\Repositories\Event;

use App\Models\Event;
use App\Repositories\BaseRepository;

class EventRepository extends BaseRepository
{
    public function __construct(Event $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active events ordered by start_date
     */
    public function getAllActive()
    {
        return $this->model
            ->where('is_active', true)
            ->orderBy('start_date', 'desc')
            ->get();
    }

    /**
     * Get all events ordered by start_date
     */
    public function getAllOrdered()
    {
        return $this->model
            ->orderBy('start_date', 'desc')
            ->get();
    }

    /**
     * Get paginated events
     */
    public function getPaginated($perPage = 15)
    {
        return $this->model
            ->orderBy('start_date', 'desc')
            ->paginate($perPage);
    }

    /**
     * Toggle event active status
     */
    public function toggleActive($id)
    {
        $event = $this->find($id);
        if ($event) {
            $event->is_active = ! $event->is_active;
            $event->save();

            return $event;
        }

        return null;
    }

    /**
     * Search events
     */
    public function search($query)
    {
        return $this->model
            ->where('title', 'like', "%{$query}%")
            ->orWhere('organization', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orderBy('start_date', 'desc')
            ->get();
    }
}
