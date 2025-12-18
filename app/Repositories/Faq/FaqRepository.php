<?php

namespace App\Repositories\Faq;

use App\Models\Faq\Faq;
use App\Repositories\BaseRepository;

class FaqRepository extends BaseRepository
{
    public function __construct(Faq $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active FAQs grouped by category for a specific locale
     */
    public function getActiveFaqsByLocale(string $locale = 'fr'): array
    {
        $faqs = $this->model
            ->active()
            ->byLocale($locale)
            ->ordered()
            ->get();

        return $faqs->groupBy('category')->map(function ($items, $category) {
            return [
                'id' => $category,
                'name' => $category,
                'items' => $items->map(function ($faq) {
                    return [
                        'question' => $faq->question,
                        'answer' => $faq->answer,
                    ];
                })->toArray(),
            ];
        })->values()->toArray();
    }

    /**
     * Get FAQs by category
     */
    public function getByCategory(string $category, string $locale = 'fr')
    {
        return $this->model
            ->byCategory($category)
            ->byLocale($locale)
            ->active()
            ->ordered()
            ->get();
    }

    /**
     * Get all FAQs with filters for admin
     */
    public function getAllWithFilters(array $filters = [])
    {
        $query = $this->model->query();

        if (isset($filters['category'])) {
            $query->byCategory($filters['category']);
        }

        if (isset($filters['locale'])) {
            $query->byLocale($filters['locale']);
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('question', 'like', '%'.$filters['search'].'%')
                    ->orWhere('answer', 'like', '%'.$filters['search'].'%');
            });
        }

        return $query->ordered()->paginate($filters['per_page'] ?? 15);
    }

    /**
     * Get unique categories
     */
    public function getCategories(): array
    {
        return $this->model
            ->select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->toArray();
    }

    /**
     * Update FAQ order
     */
    public function updateOrder(int $id, int $order): bool
    {
        return $this->model->where('id', $id)->update(['order' => $order]);
    }

    /**
     * Toggle active status
     */
    public function toggleActive(int $id): bool
    {
        $faq = $this->findById($id);

        return $faq->update(['is_active' => ! $faq->is_active]);
    }
}
