<?php

namespace App\Repositories\Blog;

use App\Models\Blog\Blog;
use App\Repositories\BaseRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class BlogRepository extends BaseRepository
{
    public function __construct(Blog $model)
    {
        parent::__construct($model);
    }

    /**
     * Get published blogs with pagination
     */
    public function getPublishedPaginated(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with(['category', 'author'])
            ->published()
            ->latest();

        // Filter by category
        if (!empty($filters['category_id'])) {
            $query->byCategory($filters['category_id']);
        }

        // Filter by tag
        if (!empty($filters['tag'])) {
            $query->byTag($filters['tag']);
        }

        // Search
        if (!empty($filters['search'])) {
            $query->search($filters['search']);
        }

        // Filter by month/year
        if (!empty($filters['month']) && !empty($filters['year'])) {
            $query->whereYear('published_at', $filters['year'])
                ->whereMonth('published_at', $filters['month']);
        }

        return $query->paginate($perPage);
    }

    /**
     * Get blog by slug
     */
    public function findBySlug(string $slug): ?Blog
    {
        return $this->model
            ->with(['category', 'author'])
            ->where('slug', $slug)
            ->published()
            ->first();
    }

    /**
     * Get recent published blogs
     */
    public function getRecent(int $limit = 3): Collection
    {
        return $this->model
            ->with(['category'])
            ->published()
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Get all unique tags
     */
    public function getAllTags(): array
    {
        $blogs = $this->model
            ->published()
            ->whereNotNull('tags')
            ->get(['tags']);

        $allTags = [];
        foreach ($blogs as $blog) {
            if (is_array($blog->tags)) {
                $allTags = array_merge($allTags, $blog->tags);
            }
        }

        return array_values(array_unique($allTags));
    }

    /**
     * Get archives grouped by month/year
     */
    public function getArchives(): Collection
    {
        $driver = config('database.default');
        $connection = config("database.connections.{$driver}.driver");

        if ($connection === 'sqlite') {
            // SQLite compatible syntax
            return $this->model
                ->selectRaw("strftime('%Y', published_at) as year, strftime('%m', published_at) as month, COUNT(*) as count")
                ->published()
                ->groupBy('year', 'month')
                ->orderBy('year', 'desc')
                ->orderBy('month', 'desc')
                ->get()
                ->map(function ($item) {
                    $item->year = (int) $item->year;
                    $item->month = (int) $item->month;
                    return $item;
                });
        } else {
            // MySQL compatible syntax
            return $this->model
                ->selectRaw('YEAR(published_at) as year, MONTH(published_at) as month, COUNT(*) as count')
                ->published()
                ->groupBy('year', 'month')
                ->orderBy('year', 'desc')
                ->orderBy('month', 'desc')
                ->get();
        }
    }

    /**
     * Get related blogs
     */
    public function getRelated(Blog $blog, int $limit = 3): Collection
    {
        return $this->model
            ->with(['category'])
            ->published()
            ->where('id', '!=', $blog->id)
            ->where(function ($query) use ($blog) {
                // Same category or has common tags
                $query->where('blog_category_id', $blog->blog_category_id);

                if (is_array($blog->tags) && count($blog->tags) > 0) {
                    foreach ($blog->tags as $tag) {
                        $query->orWhereJsonContains('tags', $tag);
                    }
                }
            })
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Get all blogs for admin with filters
     */
    public function getAllForAdmin(array $filters = []): LengthAwarePaginator
    {
        $query = $this->model
            ->with(['category', 'author'])
            ->latest();

        // Filter by status
        if (isset($filters['is_published'])) {
            $query->where('is_published', $filters['is_published']);
        }

        // Filter by category
        if (!empty($filters['category_id'])) {
            $query->where('blog_category_id', $filters['category_id']);
        }

        // Search
        if (!empty($filters['search'])) {
            $query->search($filters['search']);
        }

        return $query->paginate($filters['per_page'] ?? 15);
    }
}
