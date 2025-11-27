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
     * Get all active glossaries
     */
    public function index()
    {
        $glossaries = $this->glossaryRepo->getAllActive();

        return response()->json([
            'message' => 'Glossaries retrieved successfully',
            'data' => $glossaries,
        ]);
    }

    /**
     * Get all glossaries grouped by letter
     */
    public function groupedByLetter()
    {
        $glossaries = $this->glossaryRepo->getAllGroupedByLetter();

        return response()->json([
            'message' => 'Glossaries grouped by letter retrieved successfully',
            'data' => $glossaries,
        ]);
    }

    /**
     * Get glossaries by letter
     */
    public function byLetter($letter)
    {
        $glossaries = $this->glossaryRepo->getByLetter(strtoupper($letter));

        return response()->json([
            'message' => 'Glossaries for letter ' . strtoupper($letter) . ' retrieved successfully',
            'data' => $glossaries,
        ]);
    }

    /**
     * Search glossaries
     */
    public function search(Request $request)
    {
        $term = $request->get('term', '');

        if (empty($term)) {
            return response()->json([
                'message' => 'Search term is required',
                'data' => [],
            ], 400);
        }

        $glossaries = $this->glossaryRepo->search($term);

        return response()->json([
            'message' => 'Search results retrieved successfully',
            'data' => $glossaries,
        ]);
    }
}
