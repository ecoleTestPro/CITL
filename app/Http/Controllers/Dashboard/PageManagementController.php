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
        'home' => ['home', 'Page d\'accueil', 'home'],
        'about-citl' => ['about-citl', 'À propos du CITL', 'about.citl'],
        'about-istqb' => ['about-istqb', 'À propos de l\'ISTQB', 'about.istqb'],
        'vision' => ['vision', 'Vision', 'about.vision'],
        'missions' => ['missions', 'Missions', 'about.missions'],
        'executive-board' => ['executive-board', 'Bureau exécutif', 'about.executive_board'],
        'anti-piracy' => ['anti-piracy', 'Anti-piratage', 'exams.anti_piracy'],
        'exam-faq' => ['exam-faq', 'FAQ Examens', 'exams.faq'],
        'exam-fees' => ['exam-fees', 'Frais d\'examen', 'exams.fees'],
        'exam-questions' => ['exam-questions', 'Questions d\'examen', 'exams.questions'],
        'exam-registration' => ['exam-registration', 'Inscription aux examens', 'exams.registration'],
        'members' => ['members', 'Membres', 'membership.members'],
        'working-groups' => ['working-groups', 'Groupes de travail', 'membership.working_groups'],
        'certified-testers-list' => ['certified-testers-list', 'Liste des testeurs certifiés', 'certification.testers_list'],
        'istqb-registry' => ['istqb-registry', 'Registre ISTQB', 'certification.registry'],
        'register-certified-testers' => ['register-certified-testers', 'Enregistrer un testeur', 'certification.register'],
        'accreditation-request' => ['accreditation-request', 'Demande d\'accréditation', 'accreditation.request'],
        'accredited-organizations' => ['accredited-organizations', 'Organismes accrédités', 'accreditation.organizations'],
        'glossary' => ['glossary', 'Glossaire', 'glossary'],
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
     * Edit homepage content (legacy - uses generic editor)
     */
    public function editHome(): Response
    {
        return $this->edit('home');
    }

    /**
     * Edit About CITL page content (legacy - uses generic editor)
     */
    public function editAboutCITL(): Response
    {
        return $this->edit('about-citl');
    }

    /**
     * Edit About ISTQB page content (legacy - uses generic editor)
     */
    public function editAboutISTQB(): Response
    {
        return $this->edit('about-istqb');
    }

    /**
     * Edit Vision page content (legacy - uses generic editor)
     */
    public function editVision(): Response
    {
        return $this->edit('vision');
    }

    /**
     * Edit Missions page content (legacy - uses generic editor)
     */
    public function editMissions(): Response
    {
        return $this->edit('missions');
    }

    /**
     * Edit Executive Board page content (legacy - uses generic editor)
     */
    public function editExecutiveBoard(): Response
    {
        return $this->edit('executive-board');
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
