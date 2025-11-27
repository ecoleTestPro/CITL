<?php

namespace App\Repositories\Blog;

use App\Models\Blog\BlogCategory;
use App\Repositories\BaseRepository;
use Illuminate\Support\Collection;

class BlogCategoryRepository extends BaseRepository
{
    public function __construct(BlogCategory $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active categories with blog count
     */
    public function getActiveWithCount(): Collection
    {
        return $this->model
            ->active()
            ->withCount(['blogs' => function ($query) {
                $query->where('is_published', true);
            }])
            ->ordered()
            ->get();
    }

    /**
     * Get category by slug
     */
    public function findBySlug(string $slug): ?BlogCategory
    {
        return $this->model->where('slug', $slug)->first();
    }

    /**
     * Get all categories for dropdown
     */
    public function getAllForDropdown(): Collection
    {
        return $this->model
            ->active()
            ->ordered()
            ->get(['id', 'name']);
    }
}
