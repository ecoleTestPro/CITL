<?php

namespace App\Repositories;

use App\Models\MembershipApplication;

class MembershipApplicationRepository extends BaseRepository
{
    public function __construct(MembershipApplication $model)
    {
        parent::__construct($model);
    }

    /**
     * Create a new membership application
     */
    public function createApplication(array $data): MembershipApplication
    {
        return $this->create($data);
    }

    /**
     * Get all applications with optional filters
     */
    public function getAllApplications(array $filters = [])
    {
        $query = $this->model->query()->orderBy('created_at', 'desc');

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['membership_type'])) {
            $query->where('membership_type', $filters['membership_type']);
        }

        if (isset($filters['membership_level'])) {
            $query->where('membership_level', $filters['membership_level']);
        }

        return $query->get();
    }

    /**
     * Update application status
     */
    public function updateStatus(int $id, string $status): bool
    {
        $application = $this->find($id);
        if ($application) {
            $application->status = $status;

            return $application->save();
        }

        return false;
    }
}
