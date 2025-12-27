<?php

namespace App\Http\Controllers;

use App\Models\Partner\Partner;
use App\Models\Partner\PartnerTier;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index()
    {
        $tiers = PartnerTier::active()
            ->orderBy('name')
            ->with('activePartners')
            ->get()
            ->map(function ($tier) {
                return [
                    'id' => $tier->id,
                    'name' => $tier->localized_name,
                    'slug' => $tier->slug,
                    'color' => $tier->color,
                    'icon' => $tier->icon,
                    'description' => $tier->localized_description,
                    'partners' => $tier->activePartners->map(function ($partner) {
                        return [
                            'id' => $partner->id,
                            'name' => $partner->name,
                            'slug' => $partner->slug,
                            'logo' => $partner->logo_url,
                            'website' => $partner->website,
                            'description' => $partner->localized_description,
                        ];
                    }),
                ];
            });

        return Inertia::render('public/partners/index', [
            'tiers' => $tiers,
        ]);
    }
}
