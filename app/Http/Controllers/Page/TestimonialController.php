<?php

namespace App\Http\Controllers\Page;

use App\Http\Resources\TestimonialResource;
use App\Repositories\TestimonialRepository;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = TestimonialRepository::query()->where('is_active', true)->latest('id')->get();

        return $this->json('all testimonials data', ['testimonials' => TestimonialResource::collection($testimonials)], 200);
    }
}
