<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

class ImageService
{
    /**
     * Mapping des pages vers leurs clés d'images
     */
    private const PAGE_IMAGE_MAP = [
        'home' => [
            'hero_background',
            'about_image_1',
            'about_image_2',
        ],
        'about.citl' => [
            'overview',
        ],
        'about.istqb' => [
            'overview',
        ],
        'about.vision' => [
            'overview',
        ],
        'about.missions' => [
            'overview',
        ],
        'about.executive_board' => [
            'overview',
        ],
    ];

    /**
     * Get image keys for a specific page
     */
    public function getPageImageKeys(string $pageName): array
    {
        return self::PAGE_IMAGE_MAP[$pageName] ?? [];
    }

    /**
     * Get all images configuration
     */
    public function getAllImages(): array
    {
        $imagesPath = resource_path('js/i18n/images.json');

        if (! File::exists($imagesPath)) {
            return [];
        }

        return json_decode(File::get($imagesPath), true) ?? [];
    }

    /**
     * Get images for a specific page
     */
    public function getPageImages(string $pageName): array
    {
        $allImages = $this->getAllImages();

        return $allImages[$pageName] ?? [];
    }

    /**
     * Upload an image and update the configuration
     */
    public function uploadImage(string $pageName, string $imageKey, UploadedFile $file): string
    {
        // Generate unique filename with timestamp
        $extension = $file->getClientOriginalExtension();
        $baseName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $sanitizedName = preg_replace('/[^a-zA-Z0-9_-]/', '-', $baseName);
        $timestamp = now()->timestamp;
        $filename = "{$sanitizedName}_{$timestamp}.{$extension}";

        // Determine upload directory based on page
        $uploadDir = $this->getUploadDirectory($pageName);

        // Ensure directory exists
        $fullUploadPath = public_path("assets/images/{$uploadDir}");
        if (! File::exists($fullUploadPath)) {
            File::makeDirectory($fullUploadPath, 0755, true);
        }

        // Move the file
        $file->move($fullUploadPath, $filename);

        // Generate the public path
        $publicPath = "/assets/images/{$uploadDir}/{$filename}";

        // Update the images.json configuration
        $this->updateImagePath($pageName, $imageKey, $publicPath);

        return $publicPath;
    }

    /**
     * Update an image path in the configuration
     */
    public function updateImagePath(string $pageName, string $imageKey, string $path): bool
    {
        $imagesPath = resource_path('js/i18n/images.json');
        $allImages = $this->getAllImages();

        // Ensure the page entry exists
        if (! isset($allImages[$pageName])) {
            $allImages[$pageName] = [];
        }

        // Update the specific image path
        $allImages[$pageName][$imageKey] = $path;

        // Save the configuration
        File::put($imagesPath, json_encode($allImages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        return true;
    }

    /**
     * Get the upload directory based on page name
     */
    private function getUploadDirectory(string $pageName): string
    {
        $directoryMap = [
            'home' => 'uploads/home',
            'about.citl' => 'uploads/about',
            'about.istqb' => 'uploads/about',
            'about.vision' => 'uploads/about',
            'about.missions' => 'uploads/about',
            'about.executive_board' => 'uploads/about',
        ];

        return $directoryMap[$pageName] ?? 'uploads';
    }

    /**
     * Get list of available pages with images
     */
    public function getAvailablePages(): array
    {
        return array_keys(self::PAGE_IMAGE_MAP);
    }
}
