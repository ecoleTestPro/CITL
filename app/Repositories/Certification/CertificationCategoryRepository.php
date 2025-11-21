<?php

namespace App\Repositories\Certification;

use App\Models\Certification\CertificationCategory;
use App\Repositories\BaseRepository;

class CertificationCategoryRepository extends BaseRepository
{
    public function __construct(CertificationCategory $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active categories with their certifications.
     */
    public function getAllActiveWithCertifications()
    {
        return $this->model
            ->where('is_active', true)
            ->with(['activeCertifications'])
            ->orderBy('order')
            ->get();
    }

    /**
     * Get category by slug with certifications.
     */
    public function findBySlugWithCertifications(string $slug)
    {
        return $this->model
            ->where('slug', $slug)
            ->with(['certifications'])
            ->first();
    }

    /**
     * Get all categories ordered.
     */
    public function getAllOrdered()
    {
        return $this->model->orderBy('order')->get();
    }

    /**
     * Get category by ID with certifications.
     */
    public function findByIdWithCertifications(int $id)
    {
        return $this->model
            ->with(['certifications'])
            ->findOrFail($id);
    }
}
