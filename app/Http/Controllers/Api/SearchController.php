<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Search\SearchRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    protected SearchRepository $searchRepo;

    public function __construct(SearchRepository $searchRepo)
    {
        $this->searchRepo = $searchRepo;
    }

    /**
     * Recherche globale
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->input('q', '');

        // Validation : minimum 2 caractères
        if (strlen($query) < 2) {
            return response()->json([
                'success' => true,
                'message' => 'Veuillez entrer au moins 2 caractères',
                'data' => [
                    'pages' => [],
                    'certifications' => [],
                    'glossary' => [],
                    'total' => 0,
                ],
            ]);
        }

        $limit = $request->input('limit', 5);

        $results = $this->searchRepo->globalSearch($query, $limit);

        $total = $results['pages']->count() +
                 $results['certifications']->count() +
                 $results['glossary']->count();

        return response()->json([
            'success' => true,
            'message' => $total > 0 ? "{$total} résultat(s) trouvé(s)" : 'Aucun résultat trouvé',
            'data' => [
                'pages' => $results['pages'],
                'certifications' => $results['certifications'],
                'glossary' => $results['glossary'],
                'total' => $total,
                'query' => $query,
            ],
        ]);
    }
}
