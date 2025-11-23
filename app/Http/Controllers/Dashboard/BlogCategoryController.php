<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Blog\BlogCategoryRepository;
use Illuminate\Http\Request;

class BlogCategoryController extends Controller
{
    public function __construct(
        protected BlogCategoryRepository $categoryRepo
    ) {}

    /**
     * Get all categories for dropdown/listing
     */
    public function index()
    {
        $categories = $this->categoryRepo->all();

        return $this->json('Categories retrieved successfully', [
            'categories' => $categories,
        ], 200);
    }

    /**
     * Store a newly created category
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_categories,slug',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'order' => 'nullable|integer|min:0',
        ]);

        $category = $this->categoryRepo->create($validated);

        return $this->json('Category created successfully', [
            'category' => $category,
        ], 201);
    }

    /**
     * Update the specified category
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_categories,slug,' . $id,
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'order' => 'nullable|integer|min:0',
        ]);

        $category = $this->categoryRepo->update($id, $validated);

        if (!$category) {
            return $this->json('Category not found', [], 404);
        }

        return $this->json('Category updated successfully', [
            'category' => $category,
        ], 200);
    }

    /**
     * Remove the specified category
     */
    public function destroy($id)
    {
        // Check if category has blogs
        $category = $this->categoryRepo->find($id);

        if (!$category) {
            return $this->json('Category not found', [], 404);
        }

        if ($category->blogs()->count() > 0) {
            return $this->json('Cannot delete category with associated blogs. Please reassign or delete the blogs first.', [], 422);
        }

        $this->categoryRepo->delete($id);

        return $this->json('Category deleted successfully', [], 200);
    }

    /**
     * Toggle category active status
     */
    public function toggleActive($id)
    {
        $category = $this->categoryRepo->find($id);

        if (!$category) {
            return $this->json('Category not found', [], 404);
        }

        $updated = $this->categoryRepo->update($id, [
            'is_active' => !$category->is_active,
        ]);

        $status = !$category->is_active ? 'activated' : 'deactivated';

        return $this->json("Category {$status} successfully", [
            'category' => $updated,
        ], 200);
    }

    /**
     * Reorder categories
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'categories' => 'required|array',
            'categories.*.id' => 'required|exists:blog_categories,id',
            'categories.*.order' => 'required|integer|min:0',
        ]);

        foreach ($validated['categories'] as $categoryData) {
            $this->categoryRepo->update($categoryData['id'], [
                'order' => $categoryData['order'],
            ]);
        }

        return $this->json('Categories reordered successfully', [], 200);
    }
}
