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

    /**
     * Get active certifications by category slug.
     */
    public function getByCategorySlug(string $categorySlug)
    {
        return $this->model
            ->whereHas('category', function ($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            })
            ->where('is_active', true)
            ->with(['category'])
            ->orderBy('order')
            ->get();
    }

    /**
     * Get active certifications by category key.
     */
    public function getByCategoryKey(string $categoryKey)
    {
        return $this->model
            ->whereHas('category', function ($query) use ($categoryKey) {
                $query->where('key', $categoryKey);
            })
            ->where('is_active', true)
            ->with(['category'])
            ->orderBy('order')
            ->get();
    }
}
