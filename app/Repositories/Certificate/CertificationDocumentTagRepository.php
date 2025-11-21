<?php

namespace App\Repositories\Certificate;

use App\Models\Certificate\CertificationDocumentTag;
use App\Repositories\BaseRepository;

class CertificationDocumentTagRepository extends BaseRepository
{
    public function __construct(CertificationDocumentTag $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active tags
     */
    public function getAllActive()
    {
        return $this->model
            ->orderBy('order')
            ->orderBy('name')
            ->get();
    }

    /**
     * Find tag by slug
     */
    public function findBySlug(string $slug)
    {
        return $this->model->where('slug', $slug)->first();
    }

    /**
     * Create a new tag
     */
    public function createTag(array $data)
    {
        return $this->model->create($data);
    }
}
