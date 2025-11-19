<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PageManagementController extends Controller
{
    /**
     * Edit homepage content
     */
    public function editHome(): Response
    {
        return Inertia::render('dashboard/pages/edit-home', [
            'pageUrl' => route('home'),
            'pageTitle' => 'Home',
        ]);
    }
}
