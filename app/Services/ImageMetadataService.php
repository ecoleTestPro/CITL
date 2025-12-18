<?php

namespace App\Services;

class ImageMetadataService
{
    /**
     * Get user-friendly metadata for image fields
     */
    public static function getFieldMetadata(): array
    {
        return [
            // Home page images
            'home.hero_background' => [
                'label' => 'Image Hero',
                'description' => 'Image principale affichée dans la section hero de la page d\'accueil',
                'recommendedSize' => '1920x1080',
                'maxSize' => 5,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Hero Section',
            ],
            'home.about_image_1' => [
                'label' => 'Image À propos 1',
                'description' => 'Première image de la section "À propos" sur la page d\'accueil',
                'recommendedSize' => '600x800',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Section À propos',
            ],
            'home.about_image_2' => [
                'label' => 'Image À propos 2',
                'description' => 'Deuxième image de la section "À propos" sur la page d\'accueil',
                'recommendedSize' => '600x800',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Section À propos',
            ],

            // About CITL
            'about.citl.overview' => [
                'label' => 'Image de présentation',
                'description' => 'Image principale de la page "À propos du CITL"',
                'recommendedSize' => '800x600',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Présentation',
            ],

            // About ISTQB
            'about.istqb.overview' => [
                'label' => 'Image de présentation',
                'description' => 'Image principale de la page "À propos de l\'ISTQB"',
                'recommendedSize' => '800x600',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Présentation',
            ],

            // Vision
            'about.vision.overview' => [
                'label' => 'Image de présentation',
                'description' => 'Image principale de la page "Vision"',
                'recommendedSize' => '800x600',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Présentation',
            ],

            // Missions
            'about.missions.overview' => [
                'label' => 'Image de présentation',
                'description' => 'Image principale de la page "Missions"',
                'recommendedSize' => '800x600',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Présentation',
            ],

            // Executive Board
            'about.executive_board.overview' => [
                'label' => 'Image de présentation',
                'description' => 'Image principale de la page "Bureau Exécutif"',
                'recommendedSize' => '800x600',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Présentation',
            ],
        ];
    }

    /**
     * Get metadata for a specific image field
     */
    public static function getMetadata(string $key): ?array
    {
        $metadata = self::getFieldMetadata();

        return $metadata[$key] ?? null;
    }

    /**
     * Get image fields grouped by section for a specific page
     */
    public static function getFieldsBySection(string $pageName, array $imageKeys): array
    {
        $metadata = self::getFieldMetadata();
        $sections = [];

        foreach ($imageKeys as $key) {
            $fullKey = "{$pageName}.{$key}";
            $fieldMeta = $metadata[$fullKey] ?? null;

            if (! $fieldMeta) {
                // Create default metadata if not defined
                $fieldMeta = [
                    'label' => ucfirst(str_replace('_', ' ', $key)),
                    'description' => '',
                    'recommendedSize' => '800x600',
                    'maxSize' => 3,
                    'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                    'section' => 'Images',
                ];
            }

            $section = $fieldMeta['section'] ?? 'Images';

            if (! isset($sections[$section])) {
                $sections[$section] = [];
            }

            $sections[$section][] = [
                'key' => $key,
                'metadata' => $fieldMeta,
            ];
        }

        return $sections;
    }
}
