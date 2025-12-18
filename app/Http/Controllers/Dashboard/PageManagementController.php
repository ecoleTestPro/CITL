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
    /**
     * Configuration des pages éditables
     * slug => [routeName, pageTitle, translationKey]
     */
    private const PAGE_CONFIG = [
        // Accueil
        'home' => ['home', 'Page d\'accueil', 'home'],

        // À propos
        'about-citl' => ['about-citl', 'À propos du CITL', 'about.citl'],
        'about-istqb' => ['about-istqb', 'À propos de l\'ISTQB', 'about.istqb'],
        'vision' => ['vision', 'Vision', 'about.vision'],
        'missions' => ['missions', 'Missions', 'about.missions'],
        'executive-board' => ['executive-board', 'Bureau exécutif', 'about.executive_board'],

        // Adhésion
        'members' => ['members', 'Membres', 'membership.members'],
        'working-groups' => ['working-groups', 'Groupes de travail', 'membership.working_groups'],

        // Certifications
        'why-certification' => ['why-certification', 'Pourquoi la certification', 'certification.why'],

        // Examens
        'exam-questions' => ['exam-questions', 'Questions d\'examen', 'exams.questions'],
        'exam-fees' => ['exam-fees', 'Frais d\'examen', 'exams.fees'],
        'exam-registration' => ['exam-registration', 'Inscription aux examens', 'exams.registration'],
        'exam-faq' => ['exam-faq', 'FAQ Examens', 'exams.faq'],
        'anti-piracy' => ['anti-piracy', 'Anti-piratage', 'exams.anti_piracy'],
        'glossary' => ['glossary', 'Glossaire', 'glossary'],

        // Formation
        'accredited-organizations' => ['accredited-organizations', 'Organismes accrédités', 'accreditation.organizations'],
        'accreditation-request' => ['accreditation-request', 'Demande d\'accréditation', 'accreditation.request'],

        // Inscription
        'register-certified-testers' => ['register-certified-testers', 'Inscrire testeurs', 'certification.register'],
        'certified-testers-list' => ['certified-testers-list', 'Liste testeurs', 'certification.testers_list'],
        'istqb-registry' => ['istqb-registry', 'Registre ISTQB', 'certification.registry'],

        // Contact
        'contact' => ['contact', 'Contact', 'contact'],
    ];

    public function __construct(
        private TranslationService $translationService
    ) {}

    /**
     * Generic page editor - handles all page editing via a single component
     */
    public function edit(string $pageSlug): Response
    {
        $config = self::PAGE_CONFIG[$pageSlug] ?? null;

        if (! $config) {
            abort(404, "Page '{$pageSlug}' not found in configuration");
        }

        [$routeName, $pageTitle, $translationKey] = $config;

        return Inertia::render('dashboard/pages/generic-page-editor', [
            'pageSlug' => $pageSlug,
            'pageUrl' => route($routeName),
            'pageTitle' => $pageTitle,
            'pageName' => $translationKey,
        ]);
    }

    /**
     * Get list of all editable pages
     */
    public function getEditablePages(): JsonResponse
    {
        $pages = [];
        foreach (self::PAGE_CONFIG as $slug => [$routeName, $title, $translationKey]) {
            $pages[] = [
                'slug' => $slug,
                'title' => $title,
                'translationKey' => $translationKey,
            ];
        }

        return response()->json([
            'success' => true,
            'data' => ['pages' => $pages],
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
