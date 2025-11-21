<?php

namespace App\Repositories\Certification;

use App\Models\Certification\Certification;
use App\Repositories\BaseRepository;

class CertificationRepository extends BaseRepository
{
    public function __construct(Certification $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all certifications with their categories.
     */
    public function getAllWithCategories()
    {
        return $this->model
            ->with(['category'])
            ->orderBy('order')
            ->get();
    }

    /**
     * Get all active certifications grouped by category.
     */
    public function getAllActiveGroupedByCategory()
    {
        return $this->model
            ->where('is_active', true)
            ->with(['category'])
            ->orderBy('order')
            ->get()
            ->groupBy('category.name');
    }

    /**
     * Get certification by slug with category.
     */
    public function findBySlugWithCategory(string $slug)
    {
        return $this->model
            ->where('slug', $slug)
            ->with(['category'])
            ->first();
    }

    /**
     * Get certifications by category ID.
     */
    public function getByCategoryId(int $categoryId)
    {
        return $this->model
            ->where('certification_category_id', $categoryId)
            ->orderBy('order')
            ->get();
    }

    /**
     * Get certification by ID with category.
     */
    public function findByIdWithCategory(int $id)
    {
        return $this->model
            ->with(['category'])
            ->findOrFail($id);
    }
}
