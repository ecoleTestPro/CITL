<?php

namespace Database\Seeders;

use App\Models\CmsPage;
use App\Models\CmsMenu;
use App\Models\CmsMenuItem;
use App\Models\User\User;
use Illuminate\Database\Seeder;

class CmsSeeder extends Seeder
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

        // Create Pages
        $pages = [
            // CITL Section
            [
                'title' => 'À propos de l\'ISTQB',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'À propos de l\'ISTQB', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'L\'ISTQB (International Software Testing Qualifications Board) est l\'organisation mondiale de référence pour la certification des testeurs de logiciels.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'À propos de l\'ISTQB - CITL',
                'seo_description' => 'Découvrez l\'ISTQB, l\'organisation internationale de certification des testeurs logiciels.',
            ],
            [
                'title' => 'À propos du CITL',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'À propos du CITL', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Le CITL (Comité Ivoirien des Tests Logiciels) est le représentant officiel de l\'ISTQB en Côte d\'Ivoire.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'À propos du CITL - Comité Ivoirien des Tests Logiciels',
                'seo_description' => 'Le CITL, représentant officiel de l\'ISTQB en Côte d\'Ivoire.',
            ],
            [
                'title' => 'Notre Vision',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Notre Vision', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Devenir le leader régional de la certification en tests logiciels et promouvoir l\'excellence dans le domaine du test en Côte d\'Ivoire et en Afrique de l\'Ouest.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Notre Vision - CITL',
                'seo_description' => 'La vision du CITL pour l\'excellence en tests logiciels.',
            ],
            [
                'title' => 'Nos Missions',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Nos Missions', 'level' => 1],
                        ],
                        [
                            'type' => 'list',
                            'data' => [
                                'style' => 'unordered',
                                'items' => [
                                    'Promouvoir les bonnes pratiques de test logiciel',
                                    'Organiser des certifications ISTQB',
                                    'Former les professionnels du test',
                                    'Développer la communauté des testeurs',
                                ],
                            ],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Nos Missions - CITL',
                'seo_description' => 'Les missions du CITL pour promouvoir les tests logiciels.',
            ],
            [
                'title' => 'Le Bureau Exécutif',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Le Bureau Exécutif', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Le bureau exécutif du CITL est composé de professionnels expérimentés dans le domaine des tests logiciels.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Bureau Exécutif - CITL',
                'seo_description' => 'Rencontrez l\'équipe dirigeante du CITL.',
            ],

            // Adhésion Section
            [
                'title' => 'Membres du CITL',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Membres du CITL', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Découvrez les membres actifs du CITL et leur contribution à la communauté des testeurs.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Membres du CITL',
                'seo_description' => 'Liste des membres du Comité Ivoirien des Tests Logiciels.',
            ],
            [
                'title' => 'Les Groupes de Travail',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Les Groupes de Travail', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Les groupes de travail du CITL collaborent sur différents projets et initiatives.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Groupes de Travail - CITL',
                'seo_description' => 'Les groupes de travail actifs au sein du CITL.',
            ],

            // Certifications Section
            [
                'title' => 'Pourquoi obtenir la certification ISTQB',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Pourquoi obtenir la certification ISTQB', 'level' => 1],
                        ],
                        [
                            'type' => 'list',
                            'data' => [
                                'style' => 'unordered',
                                'items' => [
                                    'Reconnaissance internationale',
                                    'Amélioration des compétences',
                                    'Évolution de carrière',
                                    'Crédibilité professionnelle',
                                ],
                            ],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Pourquoi la certification ISTQB - CITL',
                'seo_description' => 'Les avantages de la certification ISTQB pour votre carrière.',
            ],
            [
                'title' => 'ISTQB Foundation Level',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'ISTQB Core Foundation Level', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'La certification Foundation Level est le point d\'entrée dans le schéma de certification ISTQB.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'ISTQB Foundation Level - CITL',
                'seo_description' => 'Tout savoir sur la certification ISTQB Foundation Level.',
            ],
            [
                'title' => 'ISTQB Advanced Level',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'ISTQB Core Advanced Level', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Le niveau Advanced approfondit les connaissances techniques et managériales en test logiciel.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'ISTQB Advanced Level - CITL',
                'seo_description' => 'Certification ISTQB Advanced Level pour les professionnels expérimentés.',
            ],

            // Examens Section
            [
                'title' => 'FAQ sur les examens',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Questions Fréquentes sur les Examens', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Retrouvez les réponses aux questions les plus fréquentes concernant les examens ISTQB.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'FAQ Examens ISTQB - CITL',
                'seo_description' => 'Questions fréquentes sur les examens de certification ISTQB.',
            ],
            [
                'title' => 'Frais d\'examen',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Frais d\'examen', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Consultez les tarifs des différents examens de certification ISTQB.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Frais d\'examen ISTQB - CITL',
                'seo_description' => 'Tarifs des examens de certification ISTQB en Côte d\'Ivoire.',
            ],
            [
                'title' => 'S\'inscrire à l\'examen',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'S\'inscrire à l\'examen', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Procédure d\'inscription aux examens de certification ISTQB.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Inscription examen ISTQB - CITL',
                'seo_description' => 'Comment s\'inscrire aux examens ISTQB avec le CITL.',
            ],
            [
                'title' => 'Glossaire des tests logiciels',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Glossaire ISTQB', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Glossaire officiel des termes utilisés dans le domaine des tests logiciels.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Glossaire ISTQB - CITL',
                'seo_description' => 'Glossaire des termes de test logiciel ISTQB.',
            ],

            // Organismes de formation
            [
                'title' => 'Organismes accrédités',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Organismes de Formation Accrédités', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Liste des organismes de formation accrédités par le CITL pour dispenser les formations ISTQB.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Organismes Accrédités - CITL',
                'seo_description' => 'Organismes de formation ISTQB accrédités en Côte d\'Ivoire.',
            ],
            [
                'title' => 'Demande d\'accréditation',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Demande d\'accréditation', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'Procédure pour devenir un organisme de formation accrédité par le CITL.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Demande d\'accréditation - CITL',
                'seo_description' => 'Comment devenir organisme de formation accrédité ISTQB.',
            ],

            // Contact
            [
                'title' => 'Contact',
                'content' => [
                    'blocks' => [
                        [
                            'type' => 'header',
                            'data' => ['text' => 'Contactez-nous', 'level' => 1],
                        ],
                        [
                            'type' => 'paragraph',
                            'data' => ['text' => 'N\'hésitez pas à nous contacter pour toute question concernant les certifications ISTQB.'],
                        ],
                    ],
                ],
                'status' => 'published',
                'seo_title' => 'Contact - CITL',
                'seo_description' => 'Contactez le Comité Ivoirien des Tests Logiciels.',
            ],
        ];

        $createdPages = [];
        foreach ($pages as $pageData) {
            $pageData['created_by'] = $user->id;
            $createdPages[$pageData['title']] = CmsPage::create($pageData);
        }

        // Create Menus
        $headerMenu = CmsMenu::create([
            'name' => 'Menu Principal',
            'location' => 'header',
            'is_active' => true,
        ]);

        $footerMenu = CmsMenu::create([
            'name' => 'Menu Footer',
            'location' => 'footer',
            'is_active' => true,
        ]);

        // Create Menu Items for Header Menu
        $menuItems = [
            [
                'menu_id' => $headerMenu->id,
                'title' => 'CITL',
                'url' => null,
                'order' => 1,
                'children' => [
                    ['title' => 'À propos de l\'ISTQB', 'page' => 'À propos de l\'ISTQB'],
                    ['title' => 'À propos du CITL', 'page' => 'À propos du CITL'],
                    ['title' => 'Notre Vision', 'page' => 'Notre Vision'],
                    ['title' => 'Nos Missions', 'page' => 'Nos Missions'],
                    ['title' => 'Le Bureau Exécutif', 'page' => 'Le Bureau Exécutif'],
                ],
            ],
            [
                'menu_id' => $headerMenu->id,
                'title' => 'Adhésion',
                'url' => null,
                'order' => 2,
                'children' => [
                    ['title' => 'Membres du CITL', 'page' => 'Membres du CITL'],
                    ['title' => 'Les Groupes de Travail', 'page' => 'Les Groupes de Travail'],
                ],
            ],
            [
                'menu_id' => $headerMenu->id,
                'title' => 'Certifications',
                'url' => null,
                'order' => 3,
                'children' => [
                    ['title' => 'Pourquoi obtenir la certification ISTQB', 'page' => 'Pourquoi obtenir la certification ISTQB'],
                    ['title' => 'Core Foundation', 'page' => 'ISTQB Foundation Level'],
                    ['title' => 'Core Advanced', 'page' => 'ISTQB Advanced Level'],
                ],
            ],
            [
                'menu_id' => $headerMenu->id,
                'title' => 'Examens',
                'url' => null,
                'order' => 4,
                'children' => [
                    ['title' => 'FAQ sur les examens', 'page' => 'FAQ sur les examens'],
                    ['title' => 'Frais d\'examen', 'page' => 'Frais d\'examen'],
                    ['title' => 'S\'inscrire à l\'examen', 'page' => 'S\'inscrire à l\'examen'],
                    ['title' => 'Glossaire', 'page' => 'Glossaire des tests logiciels'],
                ],
            ],
            [
                'menu_id' => $headerMenu->id,
                'title' => 'Organismes de formation',
                'url' => null,
                'order' => 5,
                'children' => [
                    ['title' => 'Organismes accrédités', 'page' => 'Organismes accrédités'],
                    ['title' => 'Demande d\'accréditation', 'page' => 'Demande d\'accréditation'],
                ],
            ],
            [
                'menu_id' => $headerMenu->id,
                'title' => 'Contact',
                'page' => 'Contact',
                'url' => null,
                'order' => 6,
            ],
        ];

        foreach ($menuItems as $item) {
            $children = $item['children'] ?? [];
            unset($item['children']);

            $pageId = null;
            if (isset($item['page']) && isset($createdPages[$item['page']])) {
                $pageId = $createdPages[$item['page']]->id;
            }

            $parentItem = CmsMenuItem::create([
                'menu_id' => $item['menu_id'],
                'title' => $item['title'],
                'url' => $item['url'],
                'page_id' => $pageId,
                'order' => $item['order'],
                'is_active' => true,
            ]);

            // Create children
            foreach ($children as $index => $child) {
                $childPageId = null;
                if (isset($child['page']) && isset($createdPages[$child['page']])) {
                    $childPageId = $createdPages[$child['page']]->id;
                }

                CmsMenuItem::create([
                    'menu_id' => $headerMenu->id,
                    'parent_id' => $parentItem->id,
                    'title' => $child['title'],
                    'url' => null,
                    'page_id' => $childPageId,
                    'order' => $index + 1,
                    'is_active' => true,
                ]);
            }
        }

        // Create Footer Menu Items
        CmsMenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'À propos',
            'page_id' => $createdPages['À propos du CITL']->id,
            'order' => 1,
            'is_active' => true,
        ]);

        CmsMenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'Certifications',
            'page_id' => $createdPages['Pourquoi obtenir la certification ISTQB']->id,
            'order' => 2,
            'is_active' => true,
        ]);

        CmsMenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'Contact',
            'page_id' => $createdPages['Contact']->id,
            'order' => 3,
            'is_active' => true,
        ]);

        $this->command->info('CMS pages and menus seeded successfully!');
    }
}
