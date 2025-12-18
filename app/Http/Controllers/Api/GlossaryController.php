<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Glossary\GlossaryRepository;
use Illuminate\Http\Request;

class GlossaryController extends Controller
{
    protected $glossaryRepo;

    public function __construct(GlossaryRepository $glossaryRepo)
    {
        $this->glossaryRepo = $glossaryRepo;
    }

    /**
     * Get locale from request (default: fr)
     */
    private function getLocale(Request $request): string
    {
        $locale = $request->get('locale', $request->header('Accept-Language', 'fr'));

        return in_array($locale, ['fr', 'en']) ? $locale : 'fr';
    }

    /**
     * Get all active glossaries
     */
    public function index(Request $request)
    {
        $locale = $this->getLocale($request);
        $glossaries = $this->glossaryRepo->getAllActive($locale);

        return response()->json([
            'message' => 'Glossaries retrieved successfully',
            'data' => $glossaries,
            'locale' => $locale,
        ]);
    }

    /**
     * Get all glossaries grouped by letter
     */
    public function groupedByLetter(Request $request)
    {
        $locale = $this->getLocale($request);
        $glossaries = $this->glossaryRepo->getAllGroupedByLetter($locale);

        return response()->json([
            'message' => 'Glossaries grouped by letter retrieved successfully',
            'data' => $glossaries,
            'locale' => $locale,
        ]);
    }

    /**
     * Get glossaries by letter
     */
    public function byLetter(Request $request, $letter)
    {
        $locale = $this->getLocale($request);
        $glossaries = $this->glossaryRepo->getByLetter(strtoupper($letter), $locale);

        return response()->json([
            'message' => 'Glossaries for letter '.strtoupper($letter).' retrieved successfully',
            'data' => $glossaries,
            'locale' => $locale,
        ]);
    }

    /**
     * Search glossaries
     */
    public function search(Request $request)
    {
        $term = $request->get('term', '');
        $locale = $this->getLocale($request);

        if (empty($term)) {
            return response()->json([
                'message' => 'Search term is required',
                'data' => [],
            ], 400);
        }

        $glossaries = $this->glossaryRepo->search($term, $locale);

        return response()->json([
            'message' => 'Search results retrieved successfully',
            'data' => $glossaries,
            'locale' => $locale,
        ]);
    }
}
