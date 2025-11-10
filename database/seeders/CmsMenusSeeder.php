<?php

namespace Database\Seeders;

use App\Models\CmsMenu;
use App\Models\CmsMenuItem;
use App\Models\CmsPage;
use Illuminate\Database\Seeder;

class CmsMenusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Menus
        $headerMenu = CmsMenu::create([
            'name' => 'Menu Principal',
            'location' => 'header',
            'is_active' => true,
            'style_template' => 'logo-center-cta',
            'is_sticky' => true,
            'style_config' => [
                'logo' => 'CITL',
                'show_search' => false,
                'show_cta' => true,
                'cta_text' => 'Nous contacter',
                'cta_url' => '/contact',
            ],
        ]);

        $footerMenu = CmsMenu::create([
            'name' => 'Menu Footer',
            'location' => 'footer',
            'is_active' => true,
            'style_template' => 'default',
            'is_sticky' => false,
            'style_config' => null,
        ]);

        // Helper function to get page ID by slug
        $getPageId = function ($slug) {
            $page = CmsPage::where('slug', $slug)->first();

            return $page ? $page->id : null;
        };

        // Create Menu Items for Header Menu
        $menuItems = [
            [
                'title' => 'CITL',
                'slug' => null, // Parent sans page
                'children' => [
                    ['title' => 'À propos de l\'ISTQB', 'slug' => 'a-propos-istqb'],
                    ['title' => 'À propos du CITL', 'slug' => 'a-propos-citl'],
                    ['title' => 'Notre Vision', 'slug' => 'notre-vision'],
                    ['title' => 'Nos Missions', 'slug' => 'nos-missions'],
                    ['title' => 'Le Bureau Exécutif', 'slug' => 'bureau-executif'],
                ],
            ],
            [
                'title' => 'Adhésion',
                'slug' => null,
                'children' => [
                    ['title' => 'Membres du CITL', 'slug' => 'membres-citl'],
                    ['title' => 'Les Groupes de Travail', 'slug' => 'groupes-travail'],
                ],
            ],
            [
                'title' => 'Certifications',
                'slug' => null,
                'children' => [
                    ['title' => 'Pourquoi obtenir la certification ISTQB', 'slug' => 'pourquoi-certification-istqb'],
                    ['title' => 'Core Foundation', 'slug' => 'istqb-foundation-level'],
                    ['title' => 'Core Advanced', 'slug' => 'istqb-advanced-level'],
                ],
            ],
            [
                'title' => 'Examens',
                'slug' => null,
                'children' => [
                    ['title' => 'FAQ sur les examens', 'slug' => 'faq-examens'],
                    ['title' => 'Frais d\'examen', 'slug' => 'frais-examen'],
                    ['title' => 'S\'inscrire à l\'examen', 'slug' => 'inscription-examen'],
                    ['title' => 'Glossaire', 'slug' => 'glossaire-tests-logiciels'],
                ],
            ],
            [
                'title' => 'Organismes de formation',
                'slug' => null,
                'children' => [
                    ['title' => 'Organismes accrédités', 'slug' => 'organismes-accredites'],
                    ['title' => 'Demande d\'accréditation', 'slug' => 'demande-accreditation'],
                ],
            ],
            [
                'title' => 'Contact',
                'slug' => 'contact',
            ],
        ];

        foreach ($menuItems as $index => $item) {
            $children = $item['children'] ?? [];
            $pageId = $item['slug'] ? $getPageId($item['slug']) : null;

            $parentItem = CmsMenuItem::create([
                'menu_id' => $headerMenu->id,
                'title' => $item['title'],
                'url' => null,
                'page_id' => $pageId,
                'order' => $index + 1,
                'is_active' => true,
            ]);

            // Create children
            foreach ($children as $childIndex => $child) {
                $childPageId = $child['slug'] ? $getPageId($child['slug']) : null;

                CmsMenuItem::create([
                    'menu_id' => $headerMenu->id,
                    'parent_id' => $parentItem->id,
                    'title' => $child['title'],
                    'url' => null,
                    'page_id' => $childPageId,
                    'order' => $childIndex + 1,
                    'is_active' => true,
                ]);
            }
        }

        // Create Footer Menu Items
        CmsMenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'À propos',
            'page_id' => $getPageId('a-propos-citl'),
            'order' => 1,
            'is_active' => true,
        ]);

        CmsMenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'Certifications',
            'page_id' => $getPageId('pourquoi-certification-istqb'),
            'order' => 2,
            'is_active' => true,
        ]);

        CmsMenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'Contact',
            'page_id' => $getPageId('contact'),
            'order' => 3,
            'is_active' => true,
        ]);

        $this->command->info('CMS menus seeded successfully!');
    }
}
