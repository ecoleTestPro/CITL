<?php

namespace App\Repositories\Glossary;

use App\Models\Glossary;
use App\Repositories\BaseRepository;

class GlossaryRepository extends BaseRepository
{
    public function __construct(Glossary $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active glossaries ordered by letter and order
     */
    public function getAllActive()
    {
        return $this->model->active()->ordered()->get();
    }

    /**
     * Get glossaries by letter
     */
    public function getByLetter($letter)
    {
        return $this->model->byLetter($letter)->active()->ordered()->get();
    }

    /**
     * Search glossaries by term
     */
    public function search($term)
    {
        return $this->model
            ->where('term', 'like', '%' . $term . '%')
            ->active()
            ->ordered()
            ->get();
    }

    /**
     * Get all glossaries grouped by letter
     */
    public function getAllGroupedByLetter()
    {
        return $this->model->active()->ordered()->get()->groupBy('letter');
    }

    /**
     * Get paginated glossaries with filters
     */
    public function getPaginated($perPage = 15, $filters = [])
    {
        $query = $this->model->query();

        if (isset($filters['letter'])) {
            $query->byLetter($filters['letter']);
        }

        if (isset($filters['search'])) {
            $query->where('term', 'like', '%' . $filters['search'] . '%');
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        return $query->ordered()->paginate($perPage);
    }
}
