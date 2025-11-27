<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Conférence Internationale sur le Testing Logiciel',
                'organization' => 'ISTQB International',
                'description' => 'Participation à la conférence annuelle de l\'ISTQB à Copenhague regroupant les experts mondiaux du testing logiciel. Présentation des nouvelles certifications et des tendances du marché.',
                'start_date' => '2024-10-15',
                'end_date' => '2024-10-18',
                'location' => 'Copenhague, Danemark',
                'tags' => ['Conférence', 'ISTQB', 'International', 'Networking'],
                'is_active' => true,
                'order' => 1,
            ],
            [
                'title' => 'Atelier de Formation ISTQB Foundation Level',
                'organization' => 'CITL - TestPro',
                'description' => 'Formation intensive de 3 jours pour la certification ISTQB Foundation Level. Couvre tous les concepts fondamentaux du testing logiciel selon le syllabus ISTQB.',
                'start_date' => '2024-09-10',
                'end_date' => '2024-09-12',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'tags' => ['Formation', 'ISTQB', 'Foundation', 'Certification'],
                'is_active' => true,
                'order' => 2,
            ],
            [
                'title' => 'Séminaire sur l\'Automatisation des Tests',
                'organization' => 'CITL',
                'description' => 'Séminaire d\'une journée sur les meilleures pratiques en automatisation des tests. Présentation d\'outils comme Selenium, Cypress et Playwright.',
                'start_date' => '2024-08-20',
                'end_date' => '2024-08-20',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'tags' => ['Séminaire', 'Automatisation', 'Outils', 'Best Practices'],
                'is_active' => true,
                'order' => 3,
            ],
            [
                'title' => 'Webinaire: Tests Agiles et DevOps',
                'organization' => 'CITL',
                'description' => 'Webinaire gratuit sur l\'intégration des tests dans un environnement Agile et DevOps. Discussion sur les pratiques de CI/CD et testing continu.',
                'start_date' => '2024-07-15',
                'end_date' => null,
                'location' => 'En ligne',
                'tags' => ['Webinaire', 'Agile', 'DevOps', 'CI/CD'],
                'is_active' => true,
                'order' => 4,
            ],
            [
                'title' => 'Certification ISTQB Advanced Test Analyst',
                'organization' => 'CITL - TestPro',
                'description' => 'Session d\'examen pour la certification ISTQB Advanced Test Analyst. Préparation intensive et passage de l\'examen officiel.',
                'start_date' => '2024-06-25',
                'end_date' => '2024-06-28',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'tags' => ['Certification', 'ISTQB', 'Advanced', 'Test Analyst'],
                'is_active' => true,
                'order' => 5,
            ],
            [
                'title' => 'Journée de la Qualité Logicielle',
                'organization' => 'CITL',
                'description' => 'Événement communautaire réunissant les professionnels de la qualité logicielle en Côte d\'Ivoire. Présentations, ateliers pratiques et networking.',
                'start_date' => '2024-05-10',
                'end_date' => '2024-05-10',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'tags' => ['Événement', 'Communauté', 'Qualité', 'Networking'],
                'is_active' => true,
                'order' => 6,
            ],
            [
                'title' => 'Formation Tests de Performance',
                'organization' => 'CITL',
                'description' => 'Formation spécialisée sur les tests de performance et de charge. Utilisation de JMeter, Gatling et analyse de métriques de performance.',
                'start_date' => '2024-04-15',
                'end_date' => '2024-04-17',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'tags' => ['Formation', 'Performance', 'JMeter', 'Load Testing'],
                'is_active' => true,
                'order' => 7,
            ],
            [
                'title' => 'Atelier Tests de Sécurité',
                'organization' => 'CITL',
                'description' => 'Atelier pratique sur les tests de sécurité des applications web. Découverte des vulnérabilités OWASP Top 10 et outils de sécurité.',
                'start_date' => '2024-03-20',
                'end_date' => '2024-03-21',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'tags' => ['Atelier', 'Sécurité', 'OWASP', 'Web Security'],
                'is_active' => true,
                'order' => 8,
            ],
            [
                'title' => 'Assemblée Générale CITL 2024',
                'organization' => 'CITL',
                'description' => 'Assemblée générale annuelle du CITL. Présentation du bilan de l\'année, élection du nouveau bureau et définition de la stratégie 2024-2025.',
                'start_date' => '2024-02-15',
                'end_date' => '2024-02-15',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'tags' => ['Assemblée', 'Gouvernance', 'Stratégie'],
                'is_active' => true,
                'order' => 9,
            ],
            [
                'title' => 'Lancement Officiel du CITL',
                'organization' => 'CITL',
                'description' => 'Événement de lancement officiel du Comité Ivoirien des Tests Logiciels (CITL). Présentation de la structure, des missions et du plan d\'action.',
                'start_date' => '2024-01-10',
                'end_date' => '2024-01-10',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'tags' => ['Lancement', 'CITL', 'Inauguration', 'Historique'],
                'is_active' => true,
                'order' => 10,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
