<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\ImageMetadataService;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ImageManagementController extends Controller
{
    public function __construct(
        private ImageService $imageService
    ) {}

    /**
     * Get images for a specific page
     */
    public function getImages(string $page): JsonResponse
    {
        $images = $this->imageService->getPageImages($page);
        $imageKeys = $this->imageService->getPageImageKeys($page);
        $sections = ImageMetadataService::getFieldsBySection($page, $imageKeys);

        return response()->json([
            'success' => true,
            'data' => [
                'images' => $images,
                'metadata' => ImageMetadataService::getFieldMetadata(),
                'sections' => $sections,
            ],
        ]);
    }

    /**
     * Upload an image for a specific page
     */
    public function uploadImage(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'page' => 'required|string',
            'key' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // Max 10MB
        ]);

        try {
            $path = $this->imageService->uploadImage(
                $validated['page'],
                $validated['key'],
                $request->file('image')
            );

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'data' => [
                    'path' => $path,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all available images configuration
     */
    public function getAllImages(): JsonResponse
    {
        $images = $this->imageService->getAllImages();

        return response()->json([
            'success' => true,
            'data' => [
                'images' => $images,
            ],
        ]);
    }
}
