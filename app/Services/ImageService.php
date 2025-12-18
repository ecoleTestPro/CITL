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
            'cta_background',
            'cta_image',
            'certification_wheel',
            'features_background',
            'features_exam_1',
            'features_exam_2',
            'features_exam_3',
            'cert_logo_ctfl',
            'cert_logo_ctal_ta',
            'cert_logo_ctal_tm',
            'cert_logo_ctal_tae',
            'cert_logo_agile',
            'cert_logo_expert',
        ],
        'global' => [
            'bg_sharp_1',
            'bg_sharp_2',
            'bg_sharp_3',
            'ads_1',
            'ads_2',
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
            'member_1',
            'member_2',
            'member_3',
        ],
        'exams.anti_piracy' => [
            'shield_main',
            'shield_verification',
        ],
        'exams.questions' => [
            'exam_success',
        ],
        'membership.members' => [
            'benefits',
        ],
        'membership.working_groups' => [
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
            'global' => 'uploads/global',
            'about.citl' => 'uploads/about',
            'about.istqb' => 'uploads/about',
            'about.vision' => 'uploads/about',
            'about.missions' => 'uploads/about',
            'about.executive_board' => 'uploads/about',
            'exams.anti_piracy' => 'uploads/exams',
            'exams.questions' => 'uploads/exams',
            'membership.members' => 'uploads/membership',
            'membership.working_groups' => 'uploads/membership',
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
