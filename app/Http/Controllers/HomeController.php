<?php

namespace App\Http\Controllers;

use App\Models\CmsPage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     *
     * Loads the CMS homepage if one is set and published,
     * otherwise renders the default static homepage.
     */
    public function index(): Response
    {
        $homepage = CmsPage::homepage()
            ->where('status', 'published')
            ->first();

        return Inertia::render('home', [
            'cmsHomepage' => $homepage ? [
                'id' => $homepage->id,
                'title' => $homepage->title,
                'slug' => $homepage->slug,
                'content' => $homepage->content, // Already casted to array by model
                'seo_title' => $homepage->seo_title,
                'seo_description' => $homepage->seo_description,
            ] : null,
        ]);
    }
}
