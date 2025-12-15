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
     * Get all active glossaries ordered by letter and term
     */
    public function getAllActive(string $locale = 'fr')
    {
        $termColumn = $locale === 'fr' ? 'term_fr' : 'term_en';
        return $this->model->active()->orderBy('letter')->orderBy($termColumn)->get();
    }

    /**
     * Get glossaries by letter
     */
    public function getByLetter($letter, string $locale = 'fr')
    {
        $termColumn = $locale === 'fr' ? 'term_fr' : 'term_en';
        return $this->model->byLetter($letter)->active()->orderBy($termColumn)->get();
    }

    /**
     * Search glossaries by term (searches in both languages)
     */
    public function search($term, string $locale = 'fr')
    {
        $termColumn = $locale === 'fr' ? 'term_fr' : 'term_en';
        return $this->model
            ->where(function ($query) use ($term) {
                $query->where('term_en', 'like', '%' . $term . '%')
                    ->orWhere('term_fr', 'like', '%' . $term . '%')
                    ->orWhere('definition_en', 'like', '%' . $term . '%')
                    ->orWhere('definition_fr', 'like', '%' . $term . '%');
            })
            ->active()
            ->orderBy('letter')
            ->orderBy($termColumn)
            ->get();
    }

    /**
     * Get all glossaries grouped by letter
     */
    public function getAllGroupedByLetter(string $locale = 'fr')
    {
        $termColumn = $locale === 'fr' ? 'term_fr' : 'term_en';
        return $this->model->active()->orderBy('letter')->orderBy($termColumn)->get()->groupBy('letter');
    }

    /**
     * Get paginated glossaries with filters
     */
    public function getPaginated($perPage = 15, $filters = [], string $locale = 'fr')
    {
        $query = $this->model->query();

        if (isset($filters['letter'])) {
            $query->byLetter($filters['letter']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('term_en', 'like', '%' . $filters['search'] . '%')
                    ->orWhere('term_fr', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        $termColumn = $locale === 'fr' ? 'term_fr' : 'term_en';
        return $query->orderBy('letter')->orderBy($termColumn)->paginate($perPage);
    }
}
