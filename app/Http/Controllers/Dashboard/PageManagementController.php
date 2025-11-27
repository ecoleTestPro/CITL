<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\TranslationMetadataService;
use App\Services\TranslationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageManagementController extends Controller
{
    public function __construct(
        private TranslationService $translationService
    ) {}

    /**
     * Edit homepage content
     */
    public function editHome(): Response
    {
        return Inertia::render('dashboard/pages/edit-home', [
            'pageUrl' => route('home'),
            'pageTitle' => 'Home',
            'pageName' => 'home',
        ]);
    }

    /**
     * Edit About CITL page content
     */
    public function editAboutCITL(): Response
    {
        return Inertia::render('dashboard/pages/about/edit-about-citl', [
            'pageUrl' => route('about-citl'),
            'pageTitle' => 'About CITL',
            'pageName' => 'about.citl',
        ]);
    }

    /**
     * Edit About ISTQB page content
     */
    public function editAboutISTQB(): Response
    {
        return Inertia::render('dashboard/pages/about/edit-about-istqb', [
            'pageUrl' => route('about-istqb'),
            'pageTitle' => 'About ISTQB',
            'pageName' => 'about.istqb',
        ]);
    }

    /**
     * Edit Vision page content
     */
    public function editVision(): Response
    {
        return Inertia::render('dashboard/pages/about/edit-vision', [
            'pageUrl' => route('vision'),
            'pageTitle' => 'Vision',
            'pageName' => 'about.vision',
        ]);
    }

    /**
     * Edit Missions page content
     */
    public function editMissions(): Response
    {
        return Inertia::render('dashboard/pages/about/edit-missions', [
            'pageUrl' => route('missions'),
            'pageTitle' => 'Missions',
            'pageName' => 'about.missions',
        ]);
    }

    /**
     * Edit Executive Board page content
     */
    public function editExecutiveBoard(): Response
    {
        return Inertia::render('dashboard/pages/about/edit-executive-board', [
            'pageUrl' => route('executive-board'),
            'pageTitle' => 'Executive Board',
            'pageName' => 'about.executive_board',
        ]);
    }

    /**
     * Get translations for a specific page
     */
    public function getTranslations(string $page): JsonResponse
    {
        $translations = $this->translationService->getPageTranslations($page);
        $locales = $this->translationService->getAvailableLocales();
        $translationKeys = $this->translationService->getPageTranslationKeys($page);
        $fieldsBySection = TranslationMetadataService::getFieldsBySection($translationKeys);

        return response()->json([
            'success' => true,
            'data' => [
                'translations' => $translations,
                'locales' => $locales,
                'metadata' => TranslationMetadataService::getFieldMetadata(),
                'sections' => $fieldsBySection,
            ],
        ]);
    }

    /**
     * Update translations for a specific locale
     */
    public function updateTranslations(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'locale' => 'required|string',
            'translations' => 'required|array',
        ]);

        $success = $this->translationService->updateTranslations(
            $validated['locale'],
            $validated['translations']
        );

        if ($success) {
            return response()->json([
                'success' => true,
                'message' => 'Translations updated successfully',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to update translations',
        ], 500);
    }
}
