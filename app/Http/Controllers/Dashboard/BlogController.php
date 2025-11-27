<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Blog\BlogCategoryRepository;
use App\Repositories\Blog\BlogRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function __construct(
        protected BlogRepository $blogRepo,
        protected BlogCategoryRepository $categoryRepo
    ) {}

    /**
     * Display a listing of the blogs
     */
    public function index(Request $request)
    {
        $filters = [
            'is_published' => $request->get('is_published'),
            'category_id' => $request->get('category_id'),
            'search' => $request->get('search'),
            'per_page' => $request->get('per_page', 15),
        ];

        $blogs = $this->blogRepo->getAllForAdmin(array_filter($filters));
        $categories = $this->categoryRepo->getAllForDropdown();

        return Inertia::render('dashboard/blog/index', [
            'blogs' => $blogs,
            'categories' => $categories,
            'filters' => $filters,
        ]);
    }

    /**
     * Store a newly created blog
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blogs,slug',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'blog_category_id' => 'nullable|exists:blog_categories,id',
            'featured_image' => 'nullable|image|max:2048',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'is_published' => 'nullable|boolean',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|array',
            'meta_keywords.*' => 'string|max:50',
        ]);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('blogs', 'public');
            $validated['featured_image'] = $path;
        }

        // Set user_id to current authenticated user
        $validated['user_id'] = Auth::id();

        // Set published_at if publishing
        if (!empty($validated['is_published']) && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $blog = $this->blogRepo->create($validated);

        return redirect()->route('dashboard.blog.index')
            ->with('success', 'Blog created successfully.');
    }

    /**
     * Update the specified blog
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blogs,slug,' . $id,
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'blog_category_id' => 'nullable|exists:blog_categories,id',
            'featured_image' => 'nullable|image|max:2048',
            'remove_image' => 'nullable|boolean',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'is_published' => 'nullable|boolean',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|array',
            'meta_keywords.*' => 'string|max:50',
        ]);

        $blog = $this->blogRepo->find($id);

        if (!$blog) {
            return redirect()->route('dashboard.blog.index')
                ->with('error', 'Blog not found.');
        }

        // Handle image removal
        if (!empty($validated['remove_image']) && $blog->featured_image) {
            Storage::disk('public')->delete($blog->featured_image);
            $validated['featured_image'] = null;
        }

        // Handle new featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($blog->featured_image) {
                Storage::disk('public')->delete($blog->featured_image);
            }
            $path = $request->file('featured_image')->store('blogs', 'public');
            $validated['featured_image'] = $path;
        }

        // Set published_at if publishing for the first time
        if (!empty($validated['is_published']) && empty($blog->published_at) && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $this->blogRepo->update($id, $validated);

        return redirect()->route('dashboard.blog.index')
            ->with('success', 'Blog updated successfully.');
    }

    /**
     * Remove the specified blog
     */
    public function destroy($id)
    {
        $blog = $this->blogRepo->find($id);

        if (!$blog) {
            return redirect()->route('dashboard.blog.index')
                ->with('error', 'Blog not found.');
        }

        // Delete featured image if exists
        if ($blog->featured_image) {
            Storage::disk('public')->delete($blog->featured_image);
        }

        $this->blogRepo->delete($id);

        return redirect()->route('dashboard.blog.index')
            ->with('success', 'Blog deleted successfully.');
    }

    /**
     * Toggle blog publish status
     */
    public function togglePublish($id)
    {
        $blog = $this->blogRepo->find($id);

        if (!$blog) {
            return back()->with('error', 'Blog not found.');
        }

        $this->blogRepo->update($id, [
            'is_published' => !$blog->is_published,
            'published_at' => !$blog->is_published && !$blog->published_at ? now() : $blog->published_at,
        ]);

        $status = !$blog->is_published ? 'published' : 'unpublished';

        return back()->with('success', "Blog {$status} successfully.");
    }
}
