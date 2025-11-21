<?php

namespace Database\Seeders;

use App\Models\Certification\Certification;
use App\Models\Certification\CertificationCategory;
use Illuminate\Database\Seeder;

class CertificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create categories
        $coreFoundation = CertificationCategory::create([
            'name' => 'Core Foundation',
            'slug' => 'core-foundation',
            'description' => 'Niveau de base pour toutes les certifications ISTQB',
            'order' => 1,
            'is_active' => true,
        ]);

        $coreAdvanced = CertificationCategory::create([
            'name' => 'Core Advanced',
            'slug' => 'core-advanced',
            'description' => 'Certifications avancées pour approfondir vos compétences',
            'order' => 2,
            'is_active' => true,
        ]);

        $specialist = CertificationCategory::create([
            'name' => 'Spécialiste',
            'slug' => 'specialist',
            'description' => 'Certifications spécialisées dans des domaines spécifiques',
            'order' => 3,
            'is_active' => true,
        ]);

        $requirementsEngineering = CertificationCategory::create([
            'name' => 'Ingénieurie des exigences',
            'slug' => 'requirements-engineering',
            'description' => 'Certifications en ingénierie des exigences',
            'order' => 4,
            'is_active' => true,
        ]);

        // Create certifications
        Certification::create([
            'certification_category_id' => $coreFoundation->id,
            'title' => 'CTFL v4.0',
            'slug' => 'ctfl-v4',
            'subtitle' => 'Certified Tester Foundation Level',
            'description' => "Cette certification Foundation est le niveau de base pour toutes les certifications du schéma de certifications ISTQB et couvre l'essentiel du test des logiciels tout en servant de préalable aux certifications avancées.",
            'icon' => 'ns-shape-35',
            'exam_questions' => 40,
            'exam_passing_score' => 65,
            'exam_total_points' => 40,
            'exam_duration' => '60 min',
            'order' => 1,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $coreAdvanced->id,
            'title' => 'CTAL-TA v4.0',
            'slug' => 'ctal-ta-v4',
            'subtitle' => 'Certified Tester Advanced Level - Test Analyst',
            'description' => "La certification Core Advanced – Test Analyst s'adresse aux professionnels du test qui souhaitent approfondir leurs compétences en analyse des tests.",
            'icon' => 'ns-shape-12',
            'exam_questions' => 40,
            'exam_passing_score' => 65,
            'exam_total_points' => 80,
            'exam_duration' => '120 min',
            'order' => 1,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $coreAdvanced->id,
            'title' => 'CTAL-TAE v2.0',
            'slug' => 'ctal-tae-v2',
            'subtitle' => 'Certified Tester Advanced Level - Test Automation Engineer',
            'description' => "La certification Core Advanced - Test Automation Engineer se concentre sur l'automatisation des tests.",
            'icon' => 'ns-shape-3',
            'exam_questions' => 40,
            'exam_passing_score' => 65,
            'exam_total_points' => 80,
            'exam_duration' => '120 min',
            'order' => 2,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $coreAdvanced->id,
            'title' => 'CTAL-TM v3.0',
            'slug' => 'ctal-tm-v3',
            'subtitle' => 'Certified Tester Advanced Level - Test Manager',
            'description' => 'La certification Core Advanced - Test Manager est destinée aux professionnels qui souhaitent occuper des postes de gestion de test.',
            'icon' => 'ns-shape-35',
            'exam_questions' => 40,
            'exam_passing_score' => 65,
            'exam_total_points' => 80,
            'exam_duration' => '120 min',
            'order' => 3,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $coreAdvanced->id,
            'title' => 'CTAL-TTA',
            'slug' => 'ctal-tta',
            'subtitle' => 'Certified Tester Advanced Level - Technical Test Analyst',
            'description' => "La certification Core Advanced - Technical Test Analyst s'adresse aux testeurs techniques qui souhaitent approfondir leurs compétences.",
            'icon' => 'ns-shape-12',
            'exam_questions' => 40,
            'exam_passing_score' => 65,
            'exam_total_points' => 80,
            'exam_duration' => '120 min',
            'order' => 4,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $specialist->id,
            'title' => 'CT-AT',
            'slug' => 'ct-at',
            'subtitle' => 'Certified Tester - Agile Testing',
            'description' => 'La certification CT-AT est conçue pour les testeurs travaillant dans des environnements Agiles.',
            'icon' => 'ns-shape-3',
            'exam_questions' => 40,
            'exam_passing_score' => 65,
            'exam_total_points' => 40,
            'exam_duration' => '60 min',
            'order' => 1,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $specialist->id,
            'title' => 'CT-GenAI',
            'slug' => 'ct-genai',
            'subtitle' => 'Certified Tester - Generative AI Testing',
            'description' => "La certification CT-GenAI se concentre sur le test des systèmes d'intelligence artificielle générative.",
            'icon' => 'ns-shape-35',
            'exam_questions' => 30,
            'exam_passing_score' => 65,
            'exam_total_points' => 30,
            'exam_duration' => '45 min',
            'order' => 2,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $specialist->id,
            'title' => 'CT-AcT',
            'slug' => 'ct-act',
            'subtitle' => 'Certified Tester - Acceptance Testing',
            'description' => "La certification CT-AcT se concentre sur les tests d'acceptation, qui visent à vérifier que les logiciels répondent aux besoins des utilisateurs finaux.",
            'icon' => 'ns-shape-12',
            'exam_questions' => 40,
            'exam_passing_score' => 65,
            'exam_total_points' => 40,
            'exam_duration' => '60 min',
            'order' => 3,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $specialist->id,
            'title' => 'CT-PT',
            'slug' => 'ct-pt',
            'subtitle' => 'Certified Tester - Performance Testing',
            'description' => 'La certification CT-PT est dédiée aux tests de performance.',
            'icon' => 'ns-shape-3',
            'exam_questions' => 40,
            'exam_passing_score' => 65,
            'exam_total_points' => 40,
            'exam_duration' => '60 min',
            'order' => 4,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $requirementsEngineering->id,
            'title' => 'CFLBA',
            'slug' => 'cflba',
            'subtitle' => 'Certified Foundation Level Business Analyst',
            'description' => "La certification CFLBA s'adresse aux analystes métier qui souhaitent acquérir des compétences en ingénierie des exigences.",
            'icon' => 'ns-shape-35',
            'exam_questions' => 40,
            'exam_passing_score' => 65,
            'exam_total_points' => 40,
            'exam_duration' => '60 min',
            'order' => 1,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $requirementsEngineering->id,
            'title' => 'IREB CPRE Foundation',
            'slug' => 'ireb-cpre-foundation',
            'subtitle' => 'Certified Professional for Requirements Engineering - Foundation Level',
            'description' => "La certification IREB CPRE Foundation est un standard international pour l'ingénierie des exigences.",
            'icon' => 'ns-shape-12',
            'exam_questions' => 45,
            'exam_passing_score' => 70,
            'exam_total_points' => 45,
            'exam_duration' => '75 min',
            'order' => 2,
            'is_active' => true,
        ]);
    }
}
