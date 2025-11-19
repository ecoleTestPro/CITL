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
