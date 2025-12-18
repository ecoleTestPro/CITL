<?php

namespace Database\Seeders;

use App\Models\Certification\Certification;
use App\Models\Certification\CertificationCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CertificationSeeder extends Seeder
{
    /**
     * Source directory for syllabus PDFs (in public folder, for seeding only)
     */
    private string $syllabusSourceDir = 'certifications';

    /**
     * Destination directory for syllabus PDFs (in storage)
     */
    private string $syllabusDestDir = 'certifications/syllabus';

    /**
     * Source directory for featured images (in public folder, for seeding only)
     */
    private string $imageSourceDir = 'certifications/images';

    /**
     * Destination directory for featured images (in storage)
     */
    private string $imageDestDir = 'certifications/featured';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure destination directories exist
        Storage::disk('public')->makeDirectory($this->syllabusDestDir);
        Storage::disk('public')->makeDirectory($this->imageDestDir);

        // Create all certifications
        $this->createCategories();

        // Auto-attach syllabus files based on slug
        $this->attachSyllabusFiles();

        // Auto-attach featured images based on slug
        $this->attachFeaturedImages();
    }

    /**
     * Automatically attach syllabus PDF files to certifications based on their slug.
     * Looks for files in public/certifications/{slug}.pdf and copies them to storage.
     */
    private function attachSyllabusFiles(): void
    {
        $certifications = Certification::whereNull('syllabus_file')->get();

        foreach ($certifications as $certification) {
            $syllabusPath = $this->copySyllabusFile($certification->slug);

            if ($syllabusPath) {
                $certification->update(['syllabus_file' => $syllabusPath]);
            }
        }
    }

    /**
     * Automatically attach featured images to certifications based on their slug.
     * Looks for files in public/certifications/images/{slug}.{jpg|png|webp} and copies them to storage.
     */
    private function attachFeaturedImages(): void
    {
        $certifications = Certification::whereNull('featured_image')->get();

        foreach ($certifications as $certification) {
            $imagePath = $this->copyFeaturedImage($certification->slug);

            if ($imagePath) {
                $certification->update(['featured_image' => $imagePath]);
            }
        }
    }

    /**
     * Create all categories and certifications.
     */
    private function createCategories(): void
    {

        // Create categories
        $coreFoundation = CertificationCategory::create([
            'name_fr' => 'Core Foundation',
            'name_en' => 'Core Foundation',
            'slug' => 'core-foundation',
            'key' => 'core-foundation',
            'description_fr' => 'Niveau de base pour toutes les certifications ISTQB',
            'description_en' => 'Entry level for all ISTQB certifications',
            'order' => 1,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $coreAdvanced = CertificationCategory::create([
            'name_fr' => 'Core Advanced',
            'name_en' => 'Core Advanced',
            'slug' => 'core-advanced',
            'key' => 'core-advanced',
            'description_fr' => 'Certifications avancées pour approfondir vos compétences',
            'description_en' => 'Advanced certifications to deepen your skills',
            'order' => 2,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $specialist = CertificationCategory::create([
            'name_fr' => 'Spécialiste',
            'name_en' => 'Specialist',
            'slug' => 'specialist',
            'key' => 'specialist',
            'description_fr' => 'Certifications spécialisées dans des domaines spécifiques',
            'description_en' => 'Specialized certifications in specific domains',
            'order' => 3,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $expertLevel = CertificationCategory::create([
            'name_fr' => 'Expert Level',
            'name_en' => 'Expert Level',
            'slug' => 'expert-level',
            'key' => 'expert-level',
            'description_fr' => 'Certifications de niveau expert pour les professionnels expérimentés',
            'description_en' => 'Expert level certifications for experienced professionals',
            'order' => 4,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $requirementsEngineering = CertificationCategory::create([
            'name_fr' => 'Ingénieurie des exigences',
            'name_en' => 'Requirements Engineering',
            'slug' => 'requirements-engineering',
            'key' => 'requirements-engineering',
            'description_fr' => 'Certifications en ingénierie des exigences',
            'description_en' => 'Requirements engineering certifications',
            'order' => 5,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $a4q = CertificationCategory::create([
            'name_fr' => 'A4Q',
            'name_en' => 'A4Q',
            'slug' => 'a4q',
            'key' => 'a4q',
            'description_fr' => 'Certifications A4Q - Alliance for Qualification',
            'description_en' => 'A4Q Certifications - Alliance for Qualification',
            'order' => 6,
            'is_active' => true,
            'can_delete' => false,
        ]);

        // Create certifications
        Certification::create([
            'certification_category_id' => $coreFoundation->id,
            'title_fr' => 'CTFL v4.0',
            'title_en' => 'CTFL v4.0',
            'slug' => 'ctfl-v4',
            'subtitle_fr' => 'Certified Tester Foundation Level',
            'subtitle_en' => 'Certified Tester Foundation Level',
            'description_fr' => "Cette certification Foundation est le niveau de base pour toutes les certifications du schéma de certifications ISTQB et couvre l'essentiel du test des logiciels tout en servant de préalable aux certifications avancées.",
            'description_en' => 'This Foundation certification is the entry level for all ISTQB certification scheme certifications and covers the essentials of software testing while serving as a prerequisite for advanced certifications.',
            'overview_fr' => '<p>La certification <strong>CTFL v4.0</strong> (Certified Tester Foundation Level) constitue la pierre angulaire de votre parcours professionnel dans le test logiciel. Elle offre une compréhension complète des principes fondamentaux, des techniques et des meilleures pratiques reconnues mondialement.</p><p>Cette certification couvre l\'ensemble du cycle de vie du test, de la planification à l\'exécution, en passant par la conception des cas de test et la gestion des défauts. Elle vous prépare à travailler efficacement dans des équipes de test modernes.</p>',
            'overview_en' => '<p>The <strong>CTFL v4.0</strong> (Certified Tester Foundation Level) certification is the cornerstone of your professional journey in software testing. It provides a comprehensive understanding of fundamental principles, techniques, and globally recognized best practices.</p><p>This certification covers the entire test lifecycle, from planning to execution, including test case design and defect management. It prepares you to work effectively in modern testing teams.</p>',
            'target_audience_fr' => '<ul><li><strong>Testeurs débutants</strong> qui souhaitent démarrer une carrière dans le test logiciel</li><li><strong>Développeurs</strong> cherchant à améliorer leurs compétences en qualité logicielle</li><li><strong>Chefs de projet</strong> nécessitant une compréhension des processus de test</li><li><strong>Analystes métier</strong> impliqués dans la validation des exigences</li><li><strong>Professionnels IT</strong> en reconversion vers le test logiciel</li></ul>',
            'target_audience_en' => '<ul><li><strong>Beginner testers</strong> who want to start a career in software testing</li><li><strong>Developers</strong> looking to improve their software quality skills</li><li><strong>Project managers</strong> who need an understanding of testing processes</li><li><strong>Business analysts</strong> involved in requirements validation</li><li><strong>IT professionals</strong> transitioning to software testing</li></ul>',
            'training_content_fr' => '<h3>Chapitre 1 : Fondamentaux du Test</h3><ul><li>Pourquoi le test est nécessaire</li><li>Qu\'est-ce que le test</li><li>Principes du test</li><li>Processus de test</li><li>Psychologie du test</li></ul><h3>Chapitre 2 : Test tout au long du cycle de vie</h3><ul><li>Modèles de cycle de vie de développement logiciel</li><li>Niveaux de test et types de test</li><li>Test de maintenance</li></ul><h3>Chapitre 3 : Test statique</h3><ul><li>Techniques de revue statique</li><li>Processus de revue</li><li>Analyse statique par outil</li></ul><h3>Chapitre 4 : Techniques de conception de test</h3><ul><li>Techniques boîte noire</li><li>Techniques boîte blanche</li><li>Techniques basées sur l\'expérience</li></ul><h3>Chapitre 5 : Gestion des tests</h3><ul><li>Organisation du test</li><li>Planification et estimation</li><li>Suivi et contrôle du test</li><li>Gestion de configuration</li><li>Gestion des défauts</li></ul><h3>Chapitre 6 : Outils de support au test</h3><ul><li>Classification des outils</li><li>Utilisation efficace des outils</li></ul>',
            'training_content_en' => '<h3>Chapter 1: Fundamentals of Testing</h3><ul><li>Why testing is necessary</li><li>What is testing</li><li>Testing principles</li><li>Test process</li><li>Test psychology</li></ul><h3>Chapter 2: Testing Throughout the Lifecycle</h3><ul><li>Software development lifecycle models</li><li>Test levels and test types</li><li>Maintenance testing</li></ul><h3>Chapter 3: Static Testing</h3><ul><li>Static review techniques</li><li>Review process</li><li>Tool-based static analysis</li></ul><h3>Chapter 4: Test Design Techniques</h3><ul><li>Black-box techniques</li><li>White-box techniques</li><li>Experience-based techniques</li></ul><h3>Chapter 5: Test Management</h3><ul><li>Test organization</li><li>Planning and estimation</li><li>Test monitoring and control</li><li>Configuration management</li><li>Defect management</li></ul><h3>Chapter 6: Test Support Tools</h3><ul><li>Tool classification</li><li>Effective use of tools</li></ul>',
            'exam_structure_details_fr' => '<p>L\'examen CTFL v4.0 est conçu pour évaluer votre compréhension théorique et votre capacité à appliquer les concepts dans des situations réelles.</p><h4>Format de l\'examen</h4><ul><li><strong>40 questions</strong> à choix multiples (QCM)</li><li><strong>1 point</strong> par question</li><li>Une seule bonne réponse par question</li><li>Pas de pénalité pour les mauvaises réponses</li></ul><h4>Critères de réussite</h4><ul><li>Score minimal : <strong>26/40 (65%)</strong></li><li>Durée : <strong>60 minutes</strong></li><li>Livre fermé (aucun document autorisé)</li></ul><h4>Répartition des questions par chapitre</h4><ul><li>Fondamentaux du Test : 8 questions</li><li>Test tout au long du cycle de vie : 5 questions</li><li>Test statique : 4 questions</li><li>Techniques de conception : 11 questions</li><li>Gestion des tests : 9 questions</li><li>Outils de support : 3 questions</li></ul>',
            'exam_structure_details_en' => '<p>The CTFL v4.0 exam is designed to assess your theoretical understanding and ability to apply concepts in real-world situations.</p><h4>Exam Format</h4><ul><li><strong>40 multiple choice questions</strong> (MCQ)</li><li><strong>1 point</strong> per question</li><li>Only one correct answer per question</li><li>No penalty for wrong answers</li></ul><h4>Pass Criteria</h4><ul><li>Minimum score: <strong>26/40 (65%)</strong></li><li>Duration: <strong>60 minutes</strong></li><li>Closed book (no documents allowed)</li></ul><h4>Question Distribution by Chapter</h4><ul><li>Fundamentals of Testing: 8 questions</li><li>Testing Throughout the Lifecycle: 5 questions</li><li>Static Testing: 4 questions</li><li>Test Design Techniques: 11 questions</li><li>Test Management: 9 questions</li><li>Test Support Tools: 3 questions</li></ul>',
            'business_outcomes_fr' => '<ul><li><h4>Reconnaissance internationale</h4><p>Certification reconnue dans plus de 120 pays et par des milliers d\'entreprises à travers le monde</p></li><li><h4>Évolution de carrière</h4><p>Porte d\'entrée vers des postes de testeur, analyste QA, et chef de projet test avec des salaires compétitifs</p></li><li><h4>Compétences validées</h4><p>Preuve tangible de votre maîtrise des standards internationaux de test logiciel selon l\'ISTQB</p></li><li><h4>Réseau professionnel</h4><p>Accès à une communauté mondiale de plus de 1 million de testeurs certifiés ISTQB</p></li><li><h4>Base solide</h4><p>Prérequis pour accéder aux certifications avancées et spécialisées ISTQB</p></li></ul>',
            'business_outcomes_en' => '<ul><li><h4>International Recognition</h4><p>Certification recognized in over 120 countries and by thousands of companies worldwide</p></li><li><h4>Career Advancement</h4><p>Gateway to positions as tester, QA analyst, and test project manager with competitive salaries</p></li><li><h4>Validated Skills</h4><p>Tangible proof of your mastery of international software testing standards according to ISTQB</p></li><li><h4>Professional Network</h4><p>Access to a global community of over 1 million ISTQB certified testers</p></li><li><h4>Solid Foundation</h4><p>Prerequisite for accessing advanced and specialized ISTQB certifications</p></li></ul>',
            'additional_information_fr' => '<h4>Prérequis</h4><p>Aucune certification préalable n\'est requise. Cependant, une expérience pratique dans le développement ou le test logiciel est recommandée pour faciliter la compréhension des concepts.</p><h4>Formation recommandée</h4><p>Une formation accréditée de 3 jours (21 heures) est fortement recommandée pour maximiser vos chances de réussite. Consultez notre <a href="/accredited-organizations">liste d\'organismes accrédités</a>.</p><h4>Validité</h4><p>La certification CTFL est <strong>valable à vie</strong>. Elle n\'expire jamais et reste reconnue internationalement.</p><h4>Langues disponibles</h4><p>L\'examen est disponible en <strong>français, anglais</strong> et plus de 60 autres langues selon les centres d\'examen.</p><h4>Repassage de l\'examen</h4><p>En cas d\'échec, vous pouvez repasser l\'examen après un délai minimum de <strong>7 jours</strong>. Aucune limite du nombre de tentatives.</p>',
            'additional_information_en' => '<h4>Prerequisites</h4><p>No prior certification is required. However, practical experience in software development or testing is recommended to facilitate understanding of the concepts.</p><h4>Recommended Training</h4><p>A 3-day (21 hours) accredited training course is strongly recommended to maximize your chances of success. Check our <a href="/accredited-organizations">list of accredited organizations</a>.</p><h4>Validity</h4><p>The CTFL certification is <strong>valid for life</strong>. It never expires and remains internationally recognized.</p><h4>Available Languages</h4><p>The exam is available in <strong>French, English</strong> and over 60 other languages depending on exam centers.</p><h4>Retaking the Exam</h4><p>In case of failure, you can retake the exam after a minimum period of <strong>7 days</strong>. No limit on the number of attempts.</p>',
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
            'title_fr' => 'CTAL-TA v4.0',
            'title_en' => 'CTAL-TA v4.0',
            'slug' => 'ctal-ta-v4',
            'subtitle_fr' => 'Certified Tester Advanced Level - Test Analyst',
            'subtitle_en' => 'Certified Tester Advanced Level - Test Analyst',
            'description_fr' => "La certification Core Advanced – Test Analyst s'adresse aux professionnels du test qui souhaitent approfondir leurs compétences en analyse des tests.",
            'description_en' => 'The Core Advanced – Test Analyst certification is designed for test professionals who want to deepen their skills in test analysis.',
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
            'title_fr' => 'CTAL-TAE v2.0',
            'title_en' => 'CTAL-TAE v2.0',
            'slug' => 'ctal-tae-v2',
            'subtitle_fr' => 'Certified Tester Advanced Level - Test Automation Engineer',
            'subtitle_en' => 'Certified Tester Advanced Level - Test Automation Engineer',
            'description_fr' => "La certification Core Advanced - Test Automation Engineer se concentre sur l'automatisation des tests.",
            'description_en' => 'The Core Advanced - Test Automation Engineer certification focuses on test automation.',
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
            'title_fr' => 'CTAL-TM v3.0',
            'title_en' => 'CTAL-TM v3.0',
            'slug' => 'ctal-tm-v3',
            'subtitle_fr' => 'Certified Tester Advanced Level - Test Manager',
            'subtitle_en' => 'Certified Tester Advanced Level - Test Manager',
            'description_fr' => 'La certification Core Advanced - Test Manager est destinée aux professionnels qui souhaitent occuper des postes de gestion de test.',
            'description_en' => 'The Core Advanced - Test Manager certification is designed for professionals who want to pursue test management positions.',
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
            'title_fr' => 'CTAL-TTA',
            'title_en' => 'CTAL-TTA',
            'slug' => 'ctal-tta',
            'subtitle_fr' => 'Certified Tester Advanced Level - Technical Test Analyst',
            'subtitle_en' => 'Certified Tester Advanced Level - Technical Test Analyst',
            'description_fr' => "La certification Core Advanced - Technical Test Analyst s'adresse aux testeurs techniques qui souhaitent approfondir leurs compétences.",
            'description_en' => 'The Core Advanced - Technical Test Analyst certification is designed for technical testers who want to deepen their skills.',
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
            'title_fr' => 'CT-AT',
            'title_en' => 'CT-AT',
            'slug' => 'ct-at',
            'subtitle_fr' => 'Certified Tester - Agile Testing',
            'subtitle_en' => 'Certified Tester - Agile Testing',
            'description_fr' => 'La certification CT-AT est conçue pour les testeurs travaillant dans des environnements Agiles.',
            'description_en' => 'The CT-AT certification is designed for testers working in Agile environments.',
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
            'title_fr' => 'CT-GenAI',
            'title_en' => 'CT-GenAI',
            'slug' => 'ct-genai',
            'subtitle_fr' => 'Certified Tester - Generative AI Testing',
            'subtitle_en' => 'Certified Tester - Generative AI Testing',
            'description_fr' => "La certification CT-GenAI se concentre sur le test des systèmes d'intelligence artificielle générative.",
            'description_en' => 'The CT-GenAI certification focuses on testing generative artificial intelligence systems.',
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
            'title_fr' => 'CT-AcT',
            'title_en' => 'CT-AcT',
            'slug' => 'ct-act',
            'subtitle_fr' => 'Certified Tester - Acceptance Testing',
            'subtitle_en' => 'Certified Tester - Acceptance Testing',
            'description_fr' => "La certification CT-AcT se concentre sur les tests d'acceptation, qui visent à vérifier que les logiciels répondent aux besoins des utilisateurs finaux.",
            'description_en' => 'The CT-AcT certification focuses on acceptance testing, which aims to verify that software meets end-user needs.',
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
            'title_fr' => 'CT-PT',
            'title_en' => 'CT-PT',
            'slug' => 'ct-pt',
            'subtitle_fr' => 'Certified Tester - Performance Testing',
            'subtitle_en' => 'Certified Tester - Performance Testing',
            'description_fr' => 'La certification CT-PT est dédiée aux tests de performance.',
            'description_en' => 'The CT-PT certification is dedicated to performance testing.',
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
            'title_fr' => 'CFLBA',
            'title_en' => 'CFLBA',
            'slug' => 'cflba',
            'subtitle_fr' => 'Certified Foundation Level Business Analyst',
            'subtitle_en' => 'Certified Foundation Level Business Analyst',
            'description_fr' => "La certification CFLBA s'adresse aux analystes métier qui souhaitent acquérir des compétences en ingénierie des exigences.",
            'description_en' => 'The CFLBA certification is designed for business analysts who want to acquire skills in requirements engineering.',
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
            'title_fr' => 'IREB CPRE Foundation',
            'title_en' => 'IREB CPRE Foundation',
            'slug' => 'ireb-cpre-foundation',
            'subtitle_fr' => 'Certified Professional for Requirements Engineering - Foundation Level',
            'subtitle_en' => 'Certified Professional for Requirements Engineering - Foundation Level',
            'description_fr' => "La certification IREB CPRE Foundation est un standard international pour l'ingénierie des exigences.",
            'description_en' => 'The IREB CPRE Foundation certification is an international standard for requirements engineering.',
            'icon' => 'ns-shape-12',
            'exam_questions' => 45,
            'exam_passing_score' => 70,
            'exam_total_points' => 45,
            'exam_duration' => '75 min',
            'order' => 2,
            'is_active' => true,
        ]);

        // Expert Level certifications
        Certification::create([
            'certification_category_id' => $expertLevel->id,
            'title_fr' => 'CTEL-TM',
            'title_en' => 'CTEL-TM',
            'slug' => 'ctel-tm',
            'subtitle_fr' => 'Certified Tester Expert Level - Test Management',
            'subtitle_en' => 'Certified Tester Expert Level - Test Management',
            'description_fr' => 'La certification CTEL-TM est le niveau expert en gestion de test, destinée aux managers de test expérimentés.',
            'description_en' => 'The CTEL-TM certification is the expert level in test management, designed for experienced test managers.',
            'icon' => 'ns-shape-35',
            'exam_questions' => 50,
            'exam_passing_score' => 70,
            'exam_total_points' => 100,
            'exam_duration' => '180 min',
            'order' => 1,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $expertLevel->id,
            'title_fr' => 'CTEL-SEC',
            'title_en' => 'CTEL-SEC',
            'slug' => 'ctel-sec',
            'subtitle_fr' => 'Certified Tester Expert Level - Security Testing',
            'subtitle_en' => 'Certified Tester Expert Level - Security Testing',
            'description_fr' => 'La certification CTEL-SEC est le niveau expert en test de sécurité pour les professionnels expérimentés.',
            'description_en' => 'The CTEL-SEC certification is the expert level in security testing for experienced professionals.',
            'icon' => 'ns-shape-12',
            'exam_questions' => 50,
            'exam_passing_score' => 70,
            'exam_total_points' => 100,
            'exam_duration' => '180 min',
            'order' => 2,
            'is_active' => true,
        ]);

        Certification::create([
            'certification_category_id' => $expertLevel->id,
            'title_fr' => 'CTEL-TA',
            'title_en' => 'CTEL-TA',
            'slug' => 'ctel-ta',
            'subtitle_fr' => 'Certified Tester Expert Level - Test Automation',
            'subtitle_en' => 'Certified Tester Expert Level - Test Automation',
            'description_fr' => "La certification CTEL-TA est le niveau expert en automatisation des tests pour les ingénieurs d'automatisation expérimentés.",
            'description_en' => 'The CTEL-TA certification is the expert level in test automation for experienced automation engineers.',
            'icon' => 'ns-shape-3',
            'exam_questions' => 50,
            'exam_passing_score' => 70,
            'exam_total_points' => 100,
            'exam_duration' => '180 min',
            'order' => 3,
            'is_active' => true,
        ]);

        // A4Q Certifications
        Certification::create([
            'certification_category_id' => $a4q->id,
            'title_fr' => 'A4Q Practical Tester',
            'title_en' => 'A4Q Practical Tester',
            'slug' => 'a4q-practical-tester',
            'subtitle_fr' => 'Testeur Pratique A4Q',
            'subtitle_en' => 'A4Q Practical Tester',
            'description_fr' => "L'application A4Q Practical Tester est conçue pour une expérience d'apprentissage fluide, centrée sur l'étudiant. Son interface intuitive et son guidage expert par IA comblent le fossé critique entre les connaissances théoriques et l'application pratique des techniques de test essentielles.",
            'description_en' => 'The A4Q Practical Tester application is designed for a seamless, student-centered learning experience. Its intuitive interface and expert AI guidance bridge the critical gap between theoretical knowledge and the practical application of essential testing techniques.',
            'overview_fr' => '<p>L\'<strong>A4Q Practical Tester</strong> est une solution révolutionnaire basée sur l\'IA pour développer et ancrer les compétences en test logiciel.</p><p>L\'application puissante pilotée par IA accélère l\'apprentissage avec des scénarios réels et des mécanismes de feedback complets. L\'examen de certification A4Q Practical Tester valide uniquement votre savoir-faire et vérifie votre capacité pratique. Le programme adopte une approche pratique en passant des examens à choix multiples aux examens à texte ouvert.</p><h3>Maîtrisez les compétences pratiques de test recherchées</h3><p>L\'industrie du test logiciel exige plus que de simples connaissances théoriques. L\'A4Q Practical Tester exploite la puissance de l\'IA et un contenu soigneusement élaboré par des experts pour offrir une expérience d\'apprentissage complète et pratique.</p><p>Les modules interactifs, exercices pratiques et feedback dynamique approfondiront votre compréhension, vous permettant d\'appliquer avec confiance les principes et techniques de test fondamentaux. L\'A4Q Practical Tester vous équipera des compétences recherchées par les employeurs et vous aidera à travailler dans le test logiciel.</p>',
            'overview_en' => '<p>The <strong>A4Q Practical Tester</strong> is a revolutionary AI-powered solution for developing and anchoring software testing skills.</p><p>The powerful AI-driven application accelerates learning with real-world scenarios and comprehensive feedback mechanisms. The A4Q Practical Tester certification exam validates only your know-how and verifies your practical ability. The program takes a hands-on approach by moving from multiple-choice exams to open-text exams.</p><h3>Master In-Demand Practical Testing Skills</h3><p>The software testing industry demands more than just theoretical knowledge. The A4Q Practical Tester leverages the power of AI and carefully crafted expert content to deliver a comprehensive, hands-on learning experience.</p><p>Interactive modules, practical exercises, and dynamic feedback will deepen your understanding, enabling you to confidently apply fundamental testing principles and techniques. The A4Q Practical Tester will equip you with the skills employers are looking for and help you work in software testing.</p>',
            'target_audience_fr' => '<ul><li><strong>Nouveaux testeurs</strong> souhaitant valider leurs compétences pratiques en test logiciel</li><li><strong>Testeurs expérimentés</strong> désirant démontrer leur capacité à appliquer les techniques de test</li><li><strong>Titulaires ISTQB® CTFL</strong> souhaitant valider qu\'ils peuvent appliquer pratiquement leurs connaissances</li><li><strong>Professionnels IT</strong> recherchant une certification axée sur les compétences plutôt que sur les connaissances théoriques</li><li><strong>Équipes de développement logiciel</strong> ayant besoin de testeurs capables d\'appliquer les techniques dans des scénarios réels</li></ul>',
            'target_audience_en' => '<ul><li><strong>New testers</strong> looking to validate their practical software testing skills</li><li><strong>Experienced testers</strong> wanting to demonstrate their ability to apply testing techniques</li><li><strong>ISTQB® CTFL holders</strong> who want to validate that they can practically apply their knowledge</li><li><strong>IT professionals</strong> seeking a skills-focused certification rather than theoretical knowledge</li><li><strong>Software development teams</strong> who need testers capable of applying techniques in real-world scenarios</li></ul>',
            'training_content_fr' => '<h3>Pratiquez les techniques de test fondamentales</h3><p>Les techniques de test fondamentales constituent la base d\'une assurance qualité efficace. L\'application fournit des scénarios guidés qui vous permettent d\'appliquer des concepts comme l\'analyse des valeurs limites et le partitionnement par équivalence.</p><h3>Techniques de test</h3><ul><li>Appliquer les techniques de test boîte noire (Analyse des valeurs limites, Partitionnement par équivalence, Transition d\'état et Tables de décision) pour créer et exécuter efficacement des cas de test</li></ul><h3>Techniques d\'estimation</h3><ul><li>Utiliser les techniques d\'estimation avec précision pour améliorer l\'efficacité globale et la productivité du processus de test</li></ul><h3>Identifier et traiter les problèmes</h3><ul><li>Identifier et traiter les problèmes tôt dans le cycle de développement avec des stratégies telles que la priorisation des cas de test et le développement piloté par les tests d\'acceptation (ATDD)</li></ul><h3>Créer des plans de test efficaces</h3><ul><li>Créer un plan de test efficace qui fournit un cadre et une structure couvrant les composants critiques nécessaires à toutes les parties prenantes pour assurer un test réussi</li></ul>',
            'training_content_en' => '<h3>Practice Fundamental Testing Techniques</h3><p>Fundamental testing techniques form the foundation of effective quality assurance. The application provides guided scenarios that allow you to apply concepts such as boundary value analysis and equivalence partitioning.</p><h3>Testing Techniques</h3><ul><li>Apply black-box testing techniques (Boundary Value Analysis, Equivalence Partitioning, State Transition, and Decision Tables) to create and execute test cases effectively</li></ul><h3>Estimation Techniques</h3><ul><li>Use estimation techniques accurately to improve overall efficiency and productivity of the testing process</li></ul><h3>Identify and Address Issues</h3><ul><li>Identify and address issues early in the development cycle with strategies such as test case prioritization and Acceptance Test-Driven Development (ATDD)</li></ul><h3>Create Effective Test Plans</h3><ul><li>Create an effective test plan that provides a framework and structure covering the critical components needed by all stakeholders to ensure successful testing</li></ul>',
            'exam_structure_details_fr' => '<h3>Structure de l\'examen</h3><p>L\'examen de certification A4Q Practical Tester est basé sur le syllabus A4Q Practical Tester. Les candidats sont évalués par rapport aux "Objectifs pratiques" et doivent démontrer leur capacité à appliquer efficacement et précisément les techniques et approches.</p><h4>Format de l\'évaluation</h4><ul><li>Format <strong>texte ouvert</strong> (l\'examen ne comprend pas de questions à choix multiples)</li><li>Les évaluateurs recherchent des réponses complètes et exhaustives alignées sur le syllabus</li><li>Vous devez correctement appliquer les techniques de test</li><li>Créer des cas de test, rapports de défauts et plans de test</li></ul><h4>Alignement avec ISTQB®</h4><p>L\'A4Q Practical Tester est étroitement aligné avec le schéma de certification ISTQB® et utilise les mêmes termes de glossaire et formulations. Pour tirer le meilleur parti de l\'A4Q Practical Tester, la certification ISTQB® Certified Tester Foundation Level (CTFL) est fortement recommandée.</p><p><em>Cependant, détenir l\'ISTQB® CTFL n\'est pas un prérequis pour réussir l\'examen A4Q Practical Tester.</em></p>',
            'exam_structure_details_en' => '<h3>Exam Structure</h3><p>The A4Q Practical Tester certification exam is based on the A4Q Practical Tester syllabus. Candidates are assessed against "Practical Objectives" and must demonstrate their ability to effectively and accurately apply techniques and approaches.</p><h4>Assessment Format</h4><ul><li><strong>Open text</strong> format (the exam does not include multiple choice questions)</li><li>Assessors look for complete and comprehensive answers aligned with the syllabus</li><li>You must correctly apply testing techniques</li><li>Create test cases, defect reports, and test plans</li></ul><h4>ISTQB® Alignment</h4><p>The A4Q Practical Tester is closely aligned with the ISTQB® certification scheme and uses the same glossary terms and wording. To get the most out of the A4Q Practical Tester, the ISTQB® Certified Tester Foundation Level (CTFL) certification is strongly recommended.</p><p><em>However, holding ISTQB® CTFL is not a prerequisite for passing the A4Q Practical Tester exam.</em></p>',
            'business_outcomes_fr' => '<ul><li><h4>Démontrez votre savoir-faire pratique</h4><p>Contrairement aux examens standard à choix multiples basés sur les connaissances, l\'examen A4Q Practical Tester évalue votre compétence réelle</p></li><li><h4>Validation des compétences pratiques</h4><p>Les titulaires de la certification A4Q Practical Tester ont démontré qu\'ils peuvent utiliser leurs connaissances en test dans des scénarios réels</p></li><li><h4>Développement de carrière</h4><p>Que vous soyez nouveau dans le test ou testeur expérimenté, l\'A4Q Practical Tester vous équipe des compétences pratiques et connaissances très demandées par les équipes de développement logiciel actuelles</p></li><li><h4>Complément idéal à ISTQB® CTFL</h4><p>Idéal pour quiconque a déjà obtenu une qualification en test logiciel et souhaite maintenant valider sa capacité à appliquer pratiquement ses connaissances</p></li></ul>',
            'business_outcomes_en' => '<ul><li><h4>Demonstrate Your Practical Know-How</h4><p>Unlike standard knowledge-based multiple choice exams, the A4Q Practical Tester exam assesses your actual competence</p></li><li><h4>Practical Skills Validation</h4><p>A4Q Practical Tester certification holders have demonstrated that they can use their testing knowledge in real-world scenarios</p></li><li><h4>Career Development</h4><p>Whether you are new to testing or an experienced tester, the A4Q Practical Tester equips you with the practical skills and knowledge highly sought after by today\'s software development teams</p></li><li><h4>Ideal Complement to ISTQB® CTFL</h4><p>Ideal for anyone who has already obtained a software testing qualification and now wants to validate their ability to practically apply their knowledge</p></li></ul>',
            'additional_information_fr' => '<h4>Préparation à l\'examen</h4><p>L\'application A4Q Practical Tester est un puissant outil d\'apprentissage supportant la préparation à l\'examen. Les candidats peuvent également participer à un cours de formation A4Q Practical Tester dispensé par un instructeur, où ils sont guidés à travers le syllabus en utilisant l\'outil d\'apprentissage pour renforcer le développement de leurs compétences.</p><h4>Feuille de route d\'apprentissage</h4><p>L\'A4Q Practical Tester fournit une feuille de route pour les apprenants afin de développer une boîte à outils complète de compétences en test applicables aux situations réelles. L\'A4Q Practical Tester complète l\'ISTQB® Certified Tester Foundation Level 4.0 (CTFL 4.0).</p><h4>Ce que vous apprendrez</h4><p>Lors du lancement de l\'A4Q Practical Tester, l\'équipe A4Q a interrogé des centaines de responsables de test et de nombreux organismes de formation sur ce qu\'ils attendent d\'une certification de testeur. Le retour était clair : ils préfèrent tous une approche pratique pour la formation et les examens. L\'accent devrait passer de la formation basée sur les connaissances à la formation basée sur les compétences.</p>',
            'additional_information_en' => '<h4>Exam Preparation</h4><p>The A4Q Practical Tester application is a powerful learning tool supporting exam preparation. Candidates can also participate in an instructor-led A4Q Practical Tester training course, where they are guided through the syllabus using the learning tool to reinforce their skills development.</p><h4>Learning Roadmap</h4><p>The A4Q Practical Tester provides a roadmap for learners to develop a comprehensive toolkit of testing skills applicable to real-world situations. The A4Q Practical Tester complements the ISTQB® Certified Tester Foundation Level 4.0 (CTFL 4.0).</p><h4>What You Will Learn</h4><p>When launching the A4Q Practical Tester, the A4Q team surveyed hundreds of test managers and many training organizations about what they expect from a tester certification. The feedback was clear: they all prefer a practical approach to training and exams. The focus should shift from knowledge-based training to skills-based training.</p>',
            'icon' => 'ns-shape-35',
            'exam_questions' => 0,
            'exam_passing_score' => 0,
            'exam_total_points' => 0,
            'exam_duration' => 'Variable',
            'order' => 1,
            'is_active' => true,
            'can_delete' => false,
        ]);
    }

    /**
     * Copy syllabus PDF from public/certifications to storage if it exists
     *
     * @param  string  $slug  The certification slug (filename without extension)
     * @return string|null The storage path or null if file doesn't exist
     */
    private function copySyllabusFile(string $slug): ?string
    {
        $sourceFile = public_path("{$this->syllabusSourceDir}/{$slug}.pdf");

        if (! File::exists($sourceFile)) {
            return null;
        }

        $destinationPath = "{$this->syllabusDestDir}/{$slug}.pdf";

        // Copy file to storage
        Storage::disk('public')->put(
            $destinationPath,
            File::get($sourceFile)
        );

        // Return the path as it would be stored in the database
        return "/storage/{$destinationPath}";
    }

    /**
     * Copy featured image from public/certifications/images to storage if it exists
     * Supports jpg, jpeg, png, webp formats
     *
     * @param  string  $slug  The certification slug (filename without extension)
     * @return string|null The storage path or null if file doesn't exist
     */
    private function copyFeaturedImage(string $slug): ?string
    {
        $supportedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        $sourceFile = null;
        $extension = null;

        // Check for each supported extension
        foreach ($supportedExtensions as $ext) {
            $filePath = public_path("{$this->imageSourceDir}/{$slug}.{$ext}");
            if (File::exists($filePath)) {
                $sourceFile = $filePath;
                $extension = $ext;
                break;
            }
        }

        if (! $sourceFile) {
            return null;
        }

        $destinationPath = "{$this->imageDestDir}/{$slug}.{$extension}";

        // Copy file to storage
        Storage::disk('public')->put(
            $destinationPath,
            File::get($sourceFile)
        );

        // Return the path as it would be stored in the database
        return "/storage/{$destinationPath}";
    }
}
