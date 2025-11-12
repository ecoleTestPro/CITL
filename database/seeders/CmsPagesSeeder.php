<?php

namespace Database\Seeders;

use App\Models\CmsPage;
use App\Models\User\User;
use Illuminate\Database\Seeder;

class CmsPagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get first user or create one
        $user = User::first();
        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Admin CITL',
                'email' => 'admin@citl.ci',
            ]);
        }

        // Empty Craft.js structure for all pages
        // Note: When initialData is undefined, Craft.js creates the structure from <Frame> children
        // So we just need to pass null/undefined for empty pages
        $emptyCraftjsContent = null;

        $pages = [
            // Page d'accueil
            [
                'title' => 'Bienvenue au CITL',
                'slug' => 'accueil',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'page_type' => 'home',
                'is_homepage' => true,
                'seo_title' => 'CITL - Comité Ivoirien des Tests Logiciels',
                'seo_description' => 'Le CITL est le représentant officiel de l\'ISTQB en Côte d\'Ivoire. Obtenez votre certification ISTQB et rejoignez la communauté des testeurs professionnels.',
            ],

            // CITL Section
            [
                'title' => 'À propos de l\'ISTQB',
                'slug' => 'a-propos-istqb',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'page_type' => 'custom',
                'seo_title' => 'À propos de l\'ISTQB - CITL',
                'seo_description' => 'Découvrez l\'ISTQB, l\'organisation internationale de certification des testeurs logiciels.',
            ],
            [
                'title' => 'À propos du CITL',
                'slug' => 'a-propos-citl',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'page_type' => 'about',
                'seo_title' => 'À propos du CITL - Comité Ivoirien des Tests Logiciels',
                'seo_description' => 'Le CITL, représentant officiel de l\'ISTQB en Côte d\'Ivoire.',
            ],
            [
                'title' => 'Notre Vision',
                'slug' => 'notre-vision',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Notre Vision - CITL',
                'seo_description' => 'La vision du CITL pour l\'excellence en tests logiciels.',
            ],
            [
                'title' => 'Nos Missions',
                'slug' => 'nos-missions',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Nos Missions - CITL',
                'seo_description' => 'Les missions du CITL pour promouvoir les tests logiciels.',
            ],
            [
                'title' => 'Le Bureau Exécutif',
                'slug' => 'bureau-executif',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Bureau Exécutif - CITL',
                'seo_description' => 'Rencontrez l\'équipe dirigeante du CITL.',
            ],

            // Adhésion Section
            [
                'title' => 'Membres du CITL',
                'slug' => 'membres-citl',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Membres du CITL',
                'seo_description' => 'Liste des membres du Comité Ivoirien des Tests Logiciels.',
            ],
            [
                'title' => 'Les Groupes de Travail',
                'slug' => 'groupes-travail',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Groupes de Travail - CITL',
                'seo_description' => 'Les groupes de travail actifs au sein du CITL.',
            ],

            // Certifications Section
            [
                'title' => 'Pourquoi obtenir la certification ISTQB',
                'slug' => 'pourquoi-certification-istqb',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Pourquoi la certification ISTQB - CITL',
                'seo_description' => 'Les avantages de la certification ISTQB pour votre carrière.',
            ],
            [
                'title' => 'ISTQB Foundation Level',
                'slug' => 'istqb-foundation-level',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'ISTQB Foundation Level - CITL',
                'seo_description' => 'Tout savoir sur la certification ISTQB Foundation Level.',
            ],
            [
                'title' => 'ISTQB Advanced Level',
                'slug' => 'istqb-advanced-level',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'ISTQB Advanced Level - CITL',
                'seo_description' => 'Certification ISTQB Advanced Level pour les professionnels expérimentés.',
            ],

            // Examens Section
            [
                'title' => 'FAQ sur les examens',
                'slug' => 'faq-examens',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'FAQ Examens ISTQB - CITL',
                'seo_description' => 'Questions fréquentes sur les examens de certification ISTQB.',
            ],
            [
                'title' => 'Frais d\'examen',
                'slug' => 'frais-examen',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Frais d\'examen ISTQB - CITL',
                'seo_description' => 'Tarifs des examens de certification ISTQB en Côte d\'Ivoire.',
            ],
            [
                'title' => 'S\'inscrire à l\'examen',
                'slug' => 'inscription-examen',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Inscription examen ISTQB - CITL',
                'seo_description' => 'Comment s\'inscrire aux examens ISTQB avec le CITL.',
            ],
            [
                'title' => 'Glossaire des tests logiciels',
                'slug' => 'glossaire-tests-logiciels',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Glossaire ISTQB - CITL',
                'seo_description' => 'Glossaire des termes de test logiciel ISTQB.',
            ],

            // Organismes de formation
            [
                'title' => 'Organismes accrédités',
                'slug' => 'organismes-accredites',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Organismes Accrédités - CITL',
                'seo_description' => 'Organismes de formation ISTQB accrédités en Côte d\'Ivoire.',
            ],
            [
                'title' => 'Demande d\'accréditation',
                'slug' => 'demande-accreditation',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'seo_title' => 'Demande d\'accréditation - CITL',
                'seo_description' => 'Comment devenir organisme de formation accrédité ISTQB.',
            ],

            // Contact
            [
                'title' => 'Contact',
                'slug' => 'contact',
                'content' => $emptyCraftjsContent,
                'status' => 'published',
                'page_type' => 'contact',
                'seo_title' => 'Contact - CITL',
                'seo_description' => 'Contactez le Comité Ivoirien des Tests Logiciels.',
            ],
        ];

        foreach ($pages as $pageData) {
            $pageData['created_by'] = $user->id;
            // Set default page_type if not specified
            if (!isset($pageData['page_type'])) {
                $pageData['page_type'] = 'custom';
            }
            // Set default is_homepage if not specified
            if (!isset($pageData['is_homepage'])) {
                $pageData['is_homepage'] = false;
            }
            CmsPage::create($pageData);
        }

        $this->command->info('CMS pages seeded successfully!');
    }
}
