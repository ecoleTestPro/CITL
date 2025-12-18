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
            'home.cta_background' => [
                'label' => 'Fond CTA',
                'description' => 'Image de fond de la section Call-to-Action',
                'recommendedSize' => '1920x800',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Section CTA',
            ],
            'home.cta_image' => [
                'label' => 'Image CTA',
                'description' => 'Image principale de la section Call-to-Action',
                'recommendedSize' => '670x500',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Section CTA',
            ],
            'home.certification_wheel' => [
                'label' => 'Roue des certifications',
                'description' => 'Image de la roue des certifications ISTQB',
                'recommendedSize' => '800x800',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Section Certifications',
            ],
            'home.features_background' => [
                'label' => 'Fond Fonctionnalités',
                'description' => 'Image de fond de la carte principale de la section Fonctionnalités',
                'recommendedSize' => '800x1200',
                'maxSize' => 5,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Section Fonctionnalités',
            ],
            'home.features_exam_1' => [
                'label' => 'Image Examen 1',
                'description' => 'Première image d\'examen dans la section Fonctionnalités',
                'recommendedSize' => '214x300',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Section Fonctionnalités',
            ],
            'home.features_exam_2' => [
                'label' => 'Image Examen 2',
                'description' => 'Deuxième image d\'examen dans la section Fonctionnalités',
                'recommendedSize' => '214x300',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Section Fonctionnalités',
            ],
            'home.features_exam_3' => [
                'label' => 'Image Examen 3',
                'description' => 'Troisième image d\'examen dans la section Fonctionnalités',
                'recommendedSize' => '214x300',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Section Fonctionnalités',
            ],
            'home.cert_logo_ctfl' => [
                'label' => 'Logo CTFL',
                'description' => 'Logo de la certification CTFL',
                'recommendedSize' => '100x100',
                'maxSize' => 1,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Logos Certifications',
            ],
            'home.cert_logo_ctal_ta' => [
                'label' => 'Logo CTAL-TA',
                'description' => 'Logo de la certification CTAL-TA',
                'recommendedSize' => '100x100',
                'maxSize' => 1,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Logos Certifications',
            ],
            'home.cert_logo_ctal_tm' => [
                'label' => 'Logo CTAL-TM',
                'description' => 'Logo de la certification CTAL-TM',
                'recommendedSize' => '100x100',
                'maxSize' => 1,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Logos Certifications',
            ],
            'home.cert_logo_ctal_tae' => [
                'label' => 'Logo CTAL-TAE',
                'description' => 'Logo de la certification CTAL-TAE',
                'recommendedSize' => '100x100',
                'maxSize' => 1,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Logos Certifications',
            ],
            'home.cert_logo_agile' => [
                'label' => 'Logo Agile',
                'description' => 'Logo de la certification Agile Tester',
                'recommendedSize' => '100x100',
                'maxSize' => 1,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Logos Certifications',
            ],
            'home.cert_logo_expert' => [
                'label' => 'Logo Expert',
                'description' => 'Logo de la certification Expert Level',
                'recommendedSize' => '100x100',
                'maxSize' => 1,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Logos Certifications',
            ],

            // Global background images
            'global.bg_sharp_1' => [
                'label' => 'Fond décoratif 1',
                'description' => 'Image décorative de fond (sharp-1)',
                'recommendedSize' => '400x800',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Fonds décoratifs',
            ],
            'global.bg_sharp_2' => [
                'label' => 'Fond décoratif 2',
                'description' => 'Image décorative de fond (sharp-2)',
                'recommendedSize' => '400x800',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Fonds décoratifs',
            ],
            'global.bg_sharp_3' => [
                'label' => 'Fond décoratif 3',
                'description' => 'Image décorative de fond (sharp-3)',
                'recommendedSize' => '400x800',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Fonds décoratifs',
            ],
            'global.ads_1' => [
                'label' => 'Bannière publicitaire 1',
                'description' => 'Première bannière publicitaire (sidebar)',
                'recommendedSize' => '300x250',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Bannières',
            ],
            'global.ads_2' => [
                'label' => 'Bannière publicitaire 2',
                'description' => 'Deuxième bannière publicitaire (sidebar)',
                'recommendedSize' => '300x250',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Bannières',
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
            'about.executive_board.member_1' => [
                'label' => 'Photo Membre 1',
                'description' => 'Photo du premier membre du bureau exécutif',
                'recommendedSize' => '400x400',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Membres',
            ],
            'about.executive_board.member_2' => [
                'label' => 'Photo Membre 2',
                'description' => 'Photo du deuxième membre du bureau exécutif',
                'recommendedSize' => '400x400',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Membres',
            ],
            'about.executive_board.member_3' => [
                'label' => 'Photo Membre 3',
                'description' => 'Photo du troisième membre du bureau exécutif',
                'recommendedSize' => '400x400',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Membres',
            ],

            // Exams - Anti Piracy
            'exams.anti_piracy.shield_main' => [
                'label' => 'Image bouclier principale',
                'description' => 'Image du bouclier dans la section avertissement',
                'recommendedSize' => '300x300',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Images',
            ],
            'exams.anti_piracy.shield_verification' => [
                'label' => 'Image bouclier vérification',
                'description' => 'Image du bouclier dans la section vérification',
                'recommendedSize' => '400x400',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Images',
            ],

            // Exams - Questions
            'exams.questions.exam_success' => [
                'label' => 'Image succès examen',
                'description' => 'Image illustrant le succès aux examens',
                'recommendedSize' => '300x300',
                'maxSize' => 2,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Images',
            ],

            // Membership - Members
            'membership.members.benefits' => [
                'label' => 'Image avantages adhésion',
                'description' => 'Image illustrant les avantages de l\'adhésion',
                'recommendedSize' => '800x600',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Images',
            ],

            // Membership - Working Groups
            'membership.working_groups.overview' => [
                'label' => 'Image présentation',
                'description' => 'Image de présentation des groupes de travail',
                'recommendedSize' => '800x600',
                'maxSize' => 3,
                'acceptedFormats' => ['image/jpeg', 'image/png', 'image/webp'],
                'section' => 'Images',
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
