<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Training\AccreditedOrganizationRepository;
use Illuminate\Http\Request;

class AccreditedOrganizationController extends Controller
{
    protected $organizationRepo;

    public function __construct(AccreditedOrganizationRepository $organizationRepo)
    {
        $this->organizationRepo = $organizationRepo;
    }

    /**
     * Get all active organizations
     */
    public function index()
    {
        $organizations = $this->organizationRepo->getAllActive();

        return response()->json([
            'success' => true,
            'data' => $organizations,
        ]);
    }

    /**
     * Get organizations grouped by country
     */
    public function groupedByCountry()
    {
        $organizations = $this->organizationRepo->getAllGroupedByCountry();

        return response()->json([
            'success' => true,
            'data' => $organizations,
        ]);
    }

    /**
     * Get organizations by country
     */
    public function byCountry($country)
    {
        $organizations = $this->organizationRepo->getByCountry($country);

        return response()->json([
            'success' => true,
            'data' => $organizations,
        ]);
    }

    /**
     * Search organizations
     */
    public function search(Request $request)
    {
        $term = $request->get('q', '');
        $organizations = $this->organizationRepo->search($term);

        return response()->json([
            'success' => true,
            'data' => $organizations,
        ]);
    }
}
