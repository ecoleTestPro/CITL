<?php

namespace App\Repositories;

use App\Models\ExamRegistration;

class ExamRegistrationRepository extends BaseRepository
{
    public function __construct(ExamRegistration $model)
    {
        parent::__construct($model);
    }

    /**
     * Create a new exam registration
     */
    public function createRegistration(array $data): ExamRegistration
    {
        return $this->create($data);
    }

    /**
     * Get all registrations with optional filters
     */
    public function getAllRegistrations(array $filters = [])
    {
        $query = $this->model->query()->orderBy('created_at', 'desc');

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['exam_name'])) {
            $query->where('exam_name', $filters['exam_name']);
        }

        return $query->get();
    }

    /**
     * Update registration status
     */
    public function updateStatus(int $id, string $status): bool
    {
        $registration = $this->find($id);
        if ($registration) {
            $registration->status = $status;

            return $registration->save();
        }

        return false;
    }
}
