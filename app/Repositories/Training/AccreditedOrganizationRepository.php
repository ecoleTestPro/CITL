<?php

namespace App\Repositories\Training;

use App\Models\Training\AccreditedOrganization;
use App\Repositories\BaseRepository;

class AccreditedOrganizationRepository extends BaseRepository
{
    public function __construct(AccreditedOrganization $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active organizations ordered by name
     */
    public function getAllActive()
    {
        return $this->model->active()->orderBy('name')->get();
    }

    /**
     * Get organizations by country
     */
    public function getByCountry($country)
    {
        return $this->model->byCountry($country)->active()->orderBy('name')->get();
    }

    /**
     * Get all active organizations grouped by country
     */
    public function getAllGroupedByCountry()
    {
        return $this->model->active()->orderBy('country')->orderBy('name')->get()->groupBy('country');
    }

    /**
     * Search organizations
     */
    public function search($term)
    {
        return $this->model
            ->where(function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%')
                    ->orWhere('city', 'like', '%' . $term . '%')
                    ->orWhere('country', 'like', '%' . $term . '%');
            })
            ->active()
            ->orderBy('name')
            ->get();
    }

    /**
     * Get paginated organizations with filters
     */
    public function getPaginated($perPage = 15, $filters = [])
    {
        $query = $this->model->query();

        if (isset($filters['country']) && $filters['country']) {
            $query->where('country', $filters['country']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $term = $filters['search'];
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', '%' . $term . '%')
                    ->orWhere('city', 'like', '%' . $term . '%')
                    ->orWhere('email', 'like', '%' . $term . '%');
            });
        }

        if (isset($filters['is_active']) && $filters['is_active'] !== null && $filters['is_active'] !== '') {
            $query->where('is_active', $filters['is_active']);
        }

        return $query->orderBy('name')->paginate($perPage);
    }

    /**
     * Get all distinct countries
     */
    public function getDistinctCountries()
    {
        return $this->model->distinct()->pluck('country')->filter()->values();
    }
}
