<?php

namespace App\Services;

class TranslationMetadataService
{
    /**
     * Get user-friendly metadata for translation fields
     */
    public static function getFieldMetadata(): array
    {
        return [
            'home.hero_title' => [
                'label' => 'Titre principal',
                'description' => 'Le titre principal affiché en haut de la page d\'accueil',
                'type' => 'text',
                'maxLength' => 100,
                'placeholder' => 'Exemple: Bienvenue sur notre plateforme',
                'section' => 'Hero Section',
            ],
            'home.hero_description' => [
                'label' => 'Description principale',
                'description' => 'Le texte descriptif sous le titre principal',
                'type' => 'richtext',
                'maxLength' => 500,
                'placeholder' => 'Décrivez votre organisation...',
                'section' => 'Hero Section',
            ],
            'home.certifications_count' => [
                'label' => 'Label "Certifications"',
                'description' => 'Le texte affiché sous le nombre de certifications',
                'type' => 'text',
                'maxLength' => 50,
                'section' => 'Statistiques',
            ],
            'home.training_levels' => [
                'label' => 'Label "Niveaux de formation"',
                'description' => 'Le texte affiché sous le nombre de niveaux',
                'type' => 'text',
                'maxLength' => 50,
                'section' => 'Statistiques',
            ],
            'home.certified_testers' => [
                'label' => 'Label "Testeurs certifiés"',
                'description' => 'Le texte affiché sous le nombre de testeurs',
                'type' => 'text',
                'maxLength' => 50,
                'section' => 'Statistiques',
            ],
            'home.learn_more' => [
                'label' => 'Bouton "En savoir plus"',
                'description' => 'Le texte du bouton call-to-action',
                'type' => 'text',
                'maxLength' => 30,
                'section' => 'Hero Section',
            ],
            'home.certification_wheel_title' => [
                'label' => 'Titre de la section certifications',
                'description' => 'Le titre de la roue des certifications',
                'type' => 'text',
                'maxLength' => 100,
                'section' => 'Certifications',
            ],
            'home.certification_wheel_description' => [
                'label' => 'Description de la section certifications',
                'description' => 'Le texte sous le titre de la roue',
                'type' => 'richtext',
                'maxLength' => 300,
                'section' => 'Certifications',
            ],
            'home.level' => [
                'label' => 'Label "Niveau"',
                'description' => 'Le mot "Niveau" affiché sur la roue',
                'type' => 'text',
                'maxLength' => 20,
                'section' => 'Certifications',
            ],
            'home.explore_certifications' => [
                'label' => 'Lien "Explorer les certifications"',
                'description' => 'Le texte du lien vers les certifications',
                'type' => 'text',
                'maxLength' => 50,
                'section' => 'Certifications',
            ],
            'home.develop_skills_title' => [
                'label' => 'Titre "Développez vos compétences"',
                'description' => 'Le titre de la section compétences',
                'type' => 'text',
                'maxLength' => 100,
                'section' => 'Compétences',
            ],
            'home.istqb_intro' => [
                'label' => 'Introduction ISTQB',
                'description' => 'Le texte d\'introduction à l\'ISTQB',
                'type' => 'text',
                'maxLength' => 150,
                'section' => 'Compétences',
            ],
            'home.istqb_description' => [
                'label' => 'Description ISTQB',
                'description' => 'La description détaillée de l\'ISTQB',
                'type' => 'richtext',
                'maxLength' => 500,
                'section' => 'Compétences',
            ],
            'home.how_to_certify' => [
                'label' => 'Titre "Comment se certifier"',
                'description' => 'Le titre de la section certification',
                'type' => 'text',
                'maxLength' => 100,
                'section' => 'Compétences',
            ],
            'home.how_to_certify_desc' => [
                'label' => 'Description "Comment se certifier"',
                'description' => 'La description du processus de certification',
                'type' => 'richtext',
                'maxLength' => 300,
                'section' => 'Compétences',
            ],
            'home.find_training' => [
                'label' => 'Titre "Trouver une formation"',
                'description' => 'Le titre de la section formation',
                'type' => 'text',
                'maxLength' => 100,
                'section' => 'Compétences',
            ],
            'home.find_training_desc' => [
                'label' => 'Description "Trouver une formation"',
                'description' => 'La description pour trouver une formation',
                'type' => 'richtext',
                'maxLength' => 300,
                'section' => 'Compétences',
            ],
            'home.learn_more_btn' => [
                'label' => 'Bouton "En savoir plus"',
                'description' => 'Le texte du bouton en savoir plus',
                'type' => 'text',
                'maxLength' => 30,
                'section' => 'Compétences',
            ],
        ];
    }

    /**
     * Get metadata for a specific field
     */
    public static function getMetadata(string $key): ?array
    {
        $metadata = self::getFieldMetadata();

        return $metadata[$key] ?? null;
    }

    /**
     * Get fields grouped by section
     */
    public static function getFieldsBySection(array $translationKeys): array
    {
        $metadata = self::getFieldMetadata();
        $sections = [];

        foreach ($translationKeys as $key) {
            $fieldMeta = $metadata[$key] ?? null;
            if (! $fieldMeta) {
                continue;
            }

            $section = $fieldMeta['section'] ?? 'Autres';

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
