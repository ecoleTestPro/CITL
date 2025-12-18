<?php

namespace App\Repositories\Search;

use App\Models\Glossary;
use Illuminate\Support\Collection;

class SearchRepository
{
    /**
     * Recherche globale dans toutes les sources
     */
    public function globalSearch(string $query, int $limit = 10): array
    {
        $results = [
            'pages' => $this->searchPages($query, $limit),
            'certifications' => $this->searchCertifications($query, $limit),
            'glossary' => $this->searchGlossary($query, $limit),
        ];

        return $results;
    }

    /**
     * Recherche dans les pages statiques
     */
    protected function searchPages(string $query, int $limit): Collection
    {
        // Pages statiques du site
        $pages = [
            [
                'title' => 'À propos de l\'ISTQB',
                'slug' => 'about-istqb',
                'url' => '/about-istqb',
                'content' => 'ISTQB International Software Testing Qualifications Board fondée en 1998 certification testing logiciel',
                'category' => 'À propos',
            ],
            [
                'title' => 'À propos du CITL',
                'slug' => 'about-citl',
                'url' => '/about-citl',
                'content' => 'Comité Ivoirien des Tests Logiciels CITL organisation certifications ISTQB Côte d\'Ivoire',
                'category' => 'À propos',
            ],
            [
                'title' => 'Notre vision',
                'slug' => 'vision',
                'url' => '/vision',
                'content' => 'Vision stratégique testing qualité logiciel Côte d\'Ivoire',
                'category' => 'À propos',
            ],
            [
                'title' => 'Nos missions',
                'slug' => 'missions',
                'url' => '/missions',
                'content' => 'Missions objectifs promotion testing logiciel formation certification',
                'category' => 'À propos',
            ],
            [
                'title' => 'Le bureau exécutif',
                'slug' => 'executive-board',
                'url' => '/executive-board',
                'content' => 'Bureau exécutif équipe direction CITL membres',
                'category' => 'Organisation',
            ],
            [
                'title' => 'Membres du CITL',
                'slug' => 'members',
                'url' => '/members',
                'content' => 'Membres adhérents CITL testeurs certifiés',
                'category' => 'Organisation',
            ],
            [
                'title' => 'Les groupes de travail',
                'slug' => 'working-groups',
                'url' => '/working-groups',
                'content' => 'Groupes de travail comités techniques ISTQB',
                'category' => 'Organisation',
            ],
            [
                'title' => 'Pourquoi obtenir la certification',
                'slug' => 'why-certification',
                'url' => '/why-certification',
                'content' => 'Avantages certification ISTQB carrière compétences reconnaissance internationale',
                'category' => 'Certifications',
            ],
            [
                'title' => 'Questions et taux de réussite',
                'slug' => 'exam-questions',
                'url' => '/exam-questions',
                'content' => 'Questions examen taux réussite statistiques',
                'category' => 'Examens',
            ],
            [
                'title' => 'Frais d\'examen',
                'slug' => 'exam-fees',
                'url' => '/exam-fees',
                'content' => 'Frais coûts tarifs examen certification',
                'category' => 'Examens',
            ],
            [
                'title' => 'S\'inscrire à l\'examen',
                'slug' => 'exam-registration',
                'url' => '/exam-registration',
                'content' => 'Inscription examen certification ISTQB procédure',
                'category' => 'Examens',
            ],
            [
                'title' => 'FAQ sur les examens',
                'slug' => 'exam-faq',
                'url' => '/exam-faq',
                'content' => 'Foire aux questions FAQ examens certification',
                'category' => 'Examens',
            ],
            [
                'title' => 'Avertissement contre la contrefaçon',
                'slug' => 'anti-piracy',
                'url' => '/anti-piracy',
                'content' => 'Contrefaçon piratage faux certificats',
                'category' => 'Informations',
            ],
            [
                'title' => 'Glossaire',
                'slug' => 'glossary',
                'url' => '/glossary',
                'content' => 'Glossaire terminologie testing logiciel définitions',
                'category' => 'Ressources',
            ],
            [
                'title' => 'Organismes accrédités',
                'slug' => 'accredited-organizations',
                'url' => '/accredited-organizations',
                'content' => 'Organismes formation accrédités CITL partenaires',
                'category' => 'Formation',
            ],
            [
                'title' => 'Demande d\'accréditation',
                'slug' => 'accreditation-request',
                'url' => '/accreditation-request',
                'content' => 'Demande accréditation organisme formation procédure',
                'category' => 'Formation',
            ],
            [
                'title' => 'Liste officielle des testeurs',
                'slug' => 'certified-testers-list',
                'url' => '/certified-testers-list',
                'content' => 'Liste testeurs certifiés ISTQB Côte d\'Ivoire',
                'category' => 'Registre',
            ],
            [
                'title' => 'Registre ISTQB',
                'slug' => 'istqb-registry',
                'url' => '/istqb-registry',
                'content' => 'Registre international ISTQB vérification certificats',
                'category' => 'Registre',
            ],
            [
                'title' => 'Événements',
                'slug' => 'events',
                'url' => '/events',
                'content' => 'Événements conférences webinaires CITL ISTQB',
                'category' => 'Actualités',
            ],
            [
                'title' => 'Blog',
                'slug' => 'blog',
                'url' => '/blog',
                'content' => 'Blog articles actualités testing logiciel',
                'category' => 'Actualités',
            ],
            [
                'title' => 'Contact',
                'slug' => 'contact',
                'url' => '/contact',
                'content' => 'Contact coordonnées CITL nous contacter',
                'category' => 'Informations',
            ],
        ];

        // Filtrer les pages qui correspondent à la recherche
        $queryLower = strtolower($query);

        return collect($pages)->filter(function ($page) use ($queryLower) {
            return str_contains(strtolower($page['title']), $queryLower) ||
                   str_contains(strtolower($page['slug']), $queryLower) ||
                   str_contains(strtolower($page['content']), $queryLower);
        })->take($limit)->values();
    }

    /**
     * Recherche dans les certifications
     */
    protected function searchCertifications(string $query, int $limit): Collection
    {
        $certifications = [
            [
                'name' => 'Certified Tester Foundation Level (CTFL)',
                'short_name' => 'CTFL',
                'category' => 'Foundation Level',
                'level' => 'Foundation',
                'url' => '/core-foundation',
                'content' => 'Niveau Foundation base testing logiciel certification ISTQB débutant',
            ],
            [
                'name' => 'Test Analyst (CTAL-TA)',
                'short_name' => 'CTAL-TA',
                'category' => 'Advanced Level',
                'level' => 'Advanced',
                'url' => '/core-advanced',
                'content' => 'Analyste tests avancé conception tests techniques',
            ],
            [
                'name' => 'Test Manager (CTAL-TM)',
                'short_name' => 'CTAL-TM',
                'category' => 'Advanced Level',
                'level' => 'Advanced',
                'url' => '/core-advanced',
                'content' => 'Gestionnaire tests management équipe projet',
            ],
            [
                'name' => 'Test Automation Engineer (CTAL-TAE)',
                'short_name' => 'CTAL-TAE',
                'category' => 'Advanced Level',
                'level' => 'Advanced',
                'url' => '/core-advanced',
                'content' => 'Ingénieur automatisation tests frameworks automation',
            ],
            [
                'name' => 'Agile Tester',
                'short_name' => 'CT-AT',
                'category' => 'Specialist',
                'level' => 'Specialist',
                'url' => '/specialist',
                'content' => 'Testeur Agile méthodes agiles Scrum',
            ],
            [
                'name' => 'Expert Test Manager',
                'short_name' => 'CTEL-TM',
                'category' => 'Expert Level',
                'level' => 'Expert',
                'url' => '/expert-level',
                'content' => 'Expert gestionnaire tests niveau expert management',
            ],
            [
                'name' => 'Expert Test Analyst',
                'short_name' => 'CTEL-TA',
                'category' => 'Expert Level',
                'level' => 'Expert',
                'url' => '/expert-level',
                'content' => 'Expert analyste tests niveau expert',
            ],
            [
                'name' => 'A4Q Testeur Pratique',
                'short_name' => 'A4Q',
                'category' => 'A4Q',
                'level' => 'Foundation',
                'url' => '/a4q-practical-tester',
                'content' => 'A4Q Alliance for Qualification testeur pratique',
            ],
        ];

        $queryLower = strtolower($query);

        return collect($certifications)->filter(function ($cert) use ($queryLower) {
            return str_contains(strtolower($cert['name']), $queryLower) ||
                   str_contains(strtolower($cert['short_name']), $queryLower) ||
                   str_contains(strtolower($cert['category']), $queryLower) ||
                   str_contains(strtolower($cert['level']), $queryLower) ||
                   str_contains(strtolower($cert['content']), $queryLower);
        })->take($limit)->values();
    }

    /**
     * Recherche dans le glossaire
     */
    protected function searchGlossary(string $query, int $limit): Collection
    {
        return Glossary::active()
            ->where(function ($q) use ($query) {
                $q->where('term', 'LIKE', "%{$query}%")
                    ->orWhere('definition', 'LIKE', "%{$query}%");
            })
            ->select('id', 'term', 'definition', 'letter')
            ->orderBy('term')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'term' => $item->term,
                    'definition' => $item->definition,
                    'letter' => $item->letter,
                    'url' => '/glossary#'.strtolower($item->letter),
                ];
            });
    }

    /**
     * Compte le nombre total de résultats
     */
    public function getTotalResults(string $query): int
    {
        $results = $this->globalSearch($query, 100);

        return $results['pages']->count() +
               $results['certifications']->count() +
               $results['glossary']->count();
    }
}
