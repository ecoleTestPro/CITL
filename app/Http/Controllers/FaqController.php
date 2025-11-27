<?php

namespace App\Http\Controllers;

use App\Repositories\Faq\FaqRepository;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    protected $faqRepository;

    public function __construct(FaqRepository $faqRepository)
    {
        $this->faqRepository = $faqRepository;
    }

    /**
     * Get all active FAQs grouped by category for public display
     */
    public function index(Request $request)
    {
        $locale = $request->input('locale', app()->getLocale());

        $faqs = $this->faqRepository->getActiveFaqsByLocale($locale);

        return $this->json('FAQs récupérées avec succès', ['faqs' => $faqs], 200);
    }

    /**
     * Get FAQs by category
     */
    public function getByCategory(Request $request, string $category)
    {
        $locale = $request->input('locale', app()->getLocale());

        $faqs = $this->faqRepository->getByCategory($category, $locale);

        return $this->json('FAQs récupérées avec succès', ['faqs' => $faqs], 200);
    }
}
