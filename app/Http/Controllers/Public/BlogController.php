<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Repositories\Blog\BlogCategoryRepository;
use App\Repositories\Blog\BlogRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function __construct(
        protected BlogRepository $blogRepo,
        protected BlogCategoryRepository $categoryRepo
    ) {}

    /**
     * Display blog listing with filters
     */
    public function index(Request $request)
    {
        $filters = [
            'category_id' => $request->get('category'),
            'tag' => $request->get('tag'),
            'search' => $request->get('search'),
            'month' => $request->get('month'),
            'year' => $request->get('year'),
        ];

        $blogs = $this->blogRepo->getPublishedPaginated(10, array_filter($filters));

        // Sidebar data
        $categories = $this->categoryRepo->getActiveWithCount();
        $recentArticles = $this->blogRepo->getRecent(3);
        $tags = $this->blogRepo->getAllTags();
        $archives = $this->blogRepo->getArchives();

        return Inertia::render('public/blog', [
            'blogs' => $blogs,
            'categories' => $categories,
            'recentArticles' => $recentArticles,
            'tags' => $tags,
            'archives' => $archives,
            'filters' => $filters,
        ]);
    }

    /**
     * Display a single blog post
     */
    public function show(string $slug)
    {
        $blog = $this->blogRepo->findBySlug($slug);

        if (!$blog) {
            abort(404);
        }

        // Increment views
        $blog->incrementViews();

        // Get related blogs
        $relatedBlogs = $this->blogRepo->getRelated($blog, 3);

        // Sidebar data
        $categories = $this->categoryRepo->getActiveWithCount();
        $recentArticles = $this->blogRepo->getRecent(3);
        $tags = $this->blogRepo->getAllTags();

        return Inertia::render('public/blog-detail', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
            'categories' => $categories,
            'recentArticles' => $recentArticles,
            'tags' => $tags,
        ]);
    }

    /**
     * Filter blogs by category
     */
    public function category(string $slug, Request $request)
    {
        $category = $this->categoryRepo->findBySlug($slug);

        if (!$category || !$category->is_active) {
            abort(404);
        }

        $filters = [
            'category_id' => $category->id,
            'search' => $request->get('search'),
        ];

        $blogs = $this->blogRepo->getPublishedPaginated(10, $filters);

        // Sidebar data
        $categories = $this->categoryRepo->getActiveWithCount();
        $recentArticles = $this->blogRepo->getRecent(3);
        $tags = $this->blogRepo->getAllTags();
        $archives = $this->blogRepo->getArchives();

        return Inertia::render('public/blog', [
            'blogs' => $blogs,
            'categories' => $categories,
            'recentArticles' => $recentArticles,
            'tags' => $tags,
            'archives' => $archives,
            'filters' => $filters,
            'currentCategory' => $category,
        ]);
    }

    /**
     * Filter blogs by tag
     */
    public function tag(string $tag, Request $request)
    {
        $filters = [
            'tag' => $tag,
            'search' => $request->get('search'),
        ];

        $blogs = $this->blogRepo->getPublishedPaginated(10, $filters);

        // Sidebar data
        $categories = $this->categoryRepo->getActiveWithCount();
        $recentArticles = $this->blogRepo->getRecent(3);
        $tags = $this->blogRepo->getAllTags();
        $archives = $this->blogRepo->getArchives();

        return Inertia::render('public/blog', [
            'blogs' => $blogs,
            'categories' => $categories,
            'recentArticles' => $recentArticles,
            'tags' => $tags,
            'archives' => $archives,
            'filters' => $filters,
            'currentTag' => $tag,
        ]);
    }

    /**
     * Filter blogs by archive (month/year)
     */
    public function archive(int $year, int $month, Request $request)
    {
        $filters = [
            'year' => $year,
            'month' => $month,
            'search' => $request->get('search'),
        ];

        $blogs = $this->blogRepo->getPublishedPaginated(10, $filters);

        // Sidebar data
        $categories = $this->categoryRepo->getActiveWithCount();
        $recentArticles = $this->blogRepo->getRecent(3);
        $tags = $this->blogRepo->getAllTags();
        $archives = $this->blogRepo->getArchives();

        return Inertia::render('public/blog', [
            'blogs' => $blogs,
            'categories' => $categories,
            'recentArticles' => $recentArticles,
            'tags' => $tags,
            'archives' => $archives,
            'filters' => $filters,
            'currentArchive' => ['year' => $year, 'month' => $month],
        ]);
    }
}
