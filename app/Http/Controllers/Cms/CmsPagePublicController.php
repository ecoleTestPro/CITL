<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\CmsPage;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class CmsPagePublicController extends Controller
{
    /**
     * Display a published page publicly (Inertia route).
     *
     * @param  string  $slug  The page slug
     */
    public function show(string $slug): Response
    {
        $page = CmsPage::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('cms/page-view', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'content' => $page->content, // Already casted to array
                'seo_title' => $page->seo_title,
                'seo_description' => $page->seo_description,
                'page_type' => $page->page_type,
            ],
        ]);
    }

    /**
     * Get page content by slug (API endpoint).
     *
     * @param  string  $slug  The page slug
     */
    public function getBySlug(string $slug): JsonResponse
    {
        $page = CmsPage::where('slug', $slug)
            ->where('status', 'published')
            ->select(['id', 'title', 'slug', 'content', 'seo_title', 'seo_description', 'page_type'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $page,
        ]);
    }

    /**
     * Get homepage content (API endpoint).
     */
    public function getHomepage(): JsonResponse
    {
        $page = CmsPage::homepage()
            ->where('status', 'published')
            ->select(['id', 'title', 'slug', 'content', 'seo_title', 'seo_description', 'page_type'])
            ->first();

        if (! $page) {
            return response()->json([
                'success' => false,
                'message' => 'No homepage set',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $page,
        ]);
    }
}
