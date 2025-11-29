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
            'key' => 'core-foundation',
            'description' => 'Niveau de base pour toutes les certifications ISTQB',
            'order' => 1,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $coreAdvanced = CertificationCategory::create([
            'name' => 'Core Advanced',
            'slug' => 'core-advanced',
            'key' => 'core-advanced',
            'description' => 'Certifications avancées pour approfondir vos compétences',
            'order' => 2,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $specialist = CertificationCategory::create([
            'name' => 'Spécialiste',
            'slug' => 'specialist',
            'key' => 'specialist',
            'description' => 'Certifications spécialisées dans des domaines spécifiques',
            'order' => 3,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $expertLevel = CertificationCategory::create([
            'name' => 'Expert Level',
            'slug' => 'expert-level',
            'key' => 'expert-level',
            'description' => 'Certifications de niveau expert pour les professionnels expérimentés',
            'order' => 4,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $requirementsEngineering = CertificationCategory::create([
            'name' => 'Ingénieurie des exigences',
            'slug' => 'requirements-engineering',
            'key' => 'requirements-engineering',
            'description' => 'Certifications en ingénierie des exigences',
            'order' => 5,
            'is_active' => true,
            'can_delete' => false,
        ]);

        $a4q = CertificationCategory::create([
            'name' => 'A4Q',
            'slug' => 'a4q',
            'key' => 'a4q',
            'description' => 'Certifications A4Q - Alliance for Qualification',
            'order' => 6,
            'is_active' => true,
            'can_delete' => false,
        ]);

        // Create certifications
        Certification::create([
            'certification_category_id' => $coreFoundation->id,
            'title' => 'CTFL v4.0',
            'slug' => 'ctfl-v4',
            'subtitle' => 'Certified Tester Foundation Level',
            'description' => "Cette certification Foundation est le niveau de base pour toutes les certifications du schéma de certifications ISTQB et couvre l'essentiel du test des logiciels tout en servant de préalable aux certifications avancées.",
            'overview' => '<p>La certification <strong>CTFL v4.0</strong> (Certified Tester Foundation Level) constitue la pierre angulaire de votre parcours professionnel dans le test logiciel. Elle offre une compréhension complète des principes fondamentaux, des techniques et des meilleures pratiques reconnues mondialement.</p><p>Cette certification couvre l\'ensemble du cycle de vie du test, de la planification à l\'exécution, en passant par la conception des cas de test et la gestion des défauts. Elle vous prépare à travailler efficacement dans des équipes de test modernes.</p>',
            'target_audience' => '<ul><li><strong>Testeurs débutants</strong> qui souhaitent démarrer une carrière dans le test logiciel</li><li><strong>Développeurs</strong> cherchant à améliorer leurs compétences en qualité logicielle</li><li><strong>Chefs de projet</strong> nécessitant une compréhension des processus de test</li><li><strong>Analystes métier</strong> impliqués dans la validation des exigences</li><li><strong>Professionnels IT</strong> en reconversion vers le test logiciel</li></ul>',
            'training_content' => '<h3>Chapitre 1 : Fondamentaux du Test</h3><ul><li>Pourquoi le test est nécessaire</li><li>Qu\'est-ce que le test</li><li>Principes du test</li><li>Processus de test</li><li>Psychologie du test</li></ul><h3>Chapitre 2 : Test tout au long du cycle de vie</h3><ul><li>Modèles de cycle de vie de développement logiciel</li><li>Niveaux de test et types de test</li><li>Test de maintenance</li></ul><h3>Chapitre 3 : Test statique</h3><ul><li>Techniques de revue statique</li><li>Processus de revue</li><li>Analyse statique par outil</li></ul><h3>Chapitre 4 : Techniques de conception de test</h3><ul><li>Techniques boîte noire</li><li>Techniques boîte blanche</li><li>Techniques basées sur l\'expérience</li></ul><h3>Chapitre 5 : Gestion des tests</h3><ul><li>Organisation du test</li><li>Planification et estimation</li><li>Suivi et contrôle du test</li><li>Gestion de configuration</li><li>Gestion des défauts</li></ul><h3>Chapitre 6 : Outils de support au test</h3><ul><li>Classification des outils</li><li>Utilisation efficace des outils</li></ul>',
            'exam_structure_details' => '<p>L\'examen CTFL v4.0 est conçu pour évaluer votre compréhension théorique et votre capacité à appliquer les concepts dans des situations réelles.</p><h4>Format de l\'examen</h4><ul><li><strong>40 questions</strong> à choix multiples (QCM)</li><li><strong>1 point</strong> par question</li><li>Une seule bonne réponse par question</li><li>Pas de pénalité pour les mauvaises réponses</li></ul><h4>Critères de réussite</h4><ul><li>Score minimal : <strong>26/40 (65%)</strong></li><li>Durée : <strong>60 minutes</strong></li><li>Livre fermé (aucun document autorisé)</li></ul><h4>Répartition des questions par chapitre</h4><ul><li>Fondamentaux du Test : 8 questions</li><li>Test tout au long du cycle de vie : 5 questions</li><li>Test statique : 4 questions</li><li>Techniques de conception : 11 questions</li><li>Gestion des tests : 9 questions</li><li>Outils de support : 3 questions</li></ul>',
            'business_outcomes' => '<ul><li><h4>Reconnaissance internationale</h4><p>Certification reconnue dans plus de 120 pays et par des milliers d\'entreprises à travers le monde</p></li><li><h4>Évolution de carrière</h4><p>Porte d\'entrée vers des postes de testeur, analyste QA, et chef de projet test avec des salaires compétitifs</p></li><li><h4>Compétences validées</h4><p>Preuve tangible de votre maîtrise des standards internationaux de test logiciel selon l\'ISTQB</p></li><li><h4>Réseau professionnel</h4><p>Accès à une communauté mondiale de plus de 1 million de testeurs certifiés ISTQB</p></li><li><h4>Base solide</h4><p>Prérequis pour accéder aux certifications avancées et spécialisées ISTQB</p></li></ul>',
            'additional_information' => '<h4>Prérequis</h4><p>Aucune certification préalable n\'est requise. Cependant, une expérience pratique dans le développement ou le test logiciel est recommandée pour faciliter la compréhension des concepts.</p><h4>Formation recommandée</h4><p>Une formation accréditée de 3 jours (21 heures) est fortement recommandée pour maximiser vos chances de réussite. Consultez notre <a href="/accredited-organizations">liste d\'organismes accrédités</a>.</p><h4>Validité</h4><p>La certification CTFL est <strong>valable à vie</strong>. Elle n\'expire jamais et reste reconnue internationalement.</p><h4>Langues disponibles</h4><p>L\'examen est disponible en <strong>français, anglais</strong> et plus de 60 autres langues selon les centres d\'examen.</p><h4>Repassage de l\'examen</h4><p>En cas d\'échec, vous pouvez repasser l\'examen après un délai minimum de <strong>7 jours</strong>. Aucune limite du nombre de tentatives.</p>',
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

        // Expert Level certifications
        Certification::create([
            'certification_category_id' => $expertLevel->id,
            'title' => 'CTEL-TM',
            'slug' => 'ctel-tm',
            'subtitle' => 'Certified Tester Expert Level - Test Management',
            'description' => 'La certification CTEL-TM est le niveau expert en gestion de test, destinée aux managers de test expérimentés.',
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
            'title' => 'CTEL-SEC',
            'slug' => 'ctel-sec',
            'subtitle' => 'Certified Tester Expert Level - Security Testing',
            'description' => "La certification CTEL-SEC est le niveau expert en test de sécurité pour les professionnels expérimentés.",
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
            'title' => 'CTEL-TA',
            'slug' => 'ctel-ta',
            'subtitle' => 'Certified Tester Expert Level - Test Automation',
            'description' => "La certification CTEL-TA est le niveau expert en automatisation des tests pour les ingénieurs d'automatisation expérimentés.",
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
            'title' => 'A4Q Practical Tester',
            'slug' => 'a4q-practical-tester',
            'subtitle' => 'Testeur Pratique A4Q',
            'description' => "L'application A4Q Practical Tester est conçue pour une expérience d'apprentissage fluide, centrée sur l'étudiant. Son interface intuitive et son guidage expert par IA comblent le fossé critique entre les connaissances théoriques et l'application pratique des techniques de test essentielles.",
            'overview' => '<p>L\'<strong>A4Q Practical Tester</strong> est une solution révolutionnaire basée sur l\'IA pour développer et ancrer les compétences en test logiciel.</p><p>L\'application puissante pilotée par IA accélère l\'apprentissage avec des scénarios réels et des mécanismes de feedback complets. L\'examen de certification A4Q Practical Tester valide uniquement votre savoir-faire et vérifie votre capacité pratique. Le programme adopte une approche pratique en passant des examens à choix multiples aux examens à texte ouvert.</p><h3>Maîtrisez les compétences pratiques de test recherchées</h3><p>L\'industrie du test logiciel exige plus que de simples connaissances théoriques. L\'A4Q Practical Tester exploite la puissance de l\'IA et un contenu soigneusement élaboré par des experts pour offrir une expérience d\'apprentissage complète et pratique.</p><p>Les modules interactifs, exercices pratiques et feedback dynamique approfondiront votre compréhension, vous permettant d\'appliquer avec confiance les principes et techniques de test fondamentaux. L\'A4Q Practical Tester vous équipera des compétences recherchées par les employeurs et vous aidera à travailler dans le test logiciel.</p>',
            'target_audience' => '<ul><li><strong>Nouveaux testeurs</strong> souhaitant valider leurs compétences pratiques en test logiciel</li><li><strong>Testeurs expérimentés</strong> désirant démontrer leur capacité à appliquer les techniques de test</li><li><strong>Titulaires ISTQB® CTFL</strong> souhaitant valider qu\'ils peuvent appliquer pratiquement leurs connaissances</li><li><strong>Professionnels IT</strong> recherchant une certification axée sur les compétences plutôt que sur les connaissances théoriques</li><li><strong>Équipes de développement logiciel</strong> ayant besoin de testeurs capables d\'appliquer les techniques dans des scénarios réels</li></ul>',
            'training_content' => '<h3>Pratiquez les techniques de test fondamentales</h3><p>Les techniques de test fondamentales constituent la base d\'une assurance qualité efficace. L\'application fournit des scénarios guidés qui vous permettent d\'appliquer des concepts comme l\'analyse des valeurs limites et le partitionnement par équivalence.</p><h3>Techniques de test</h3><ul><li>Appliquer les techniques de test boîte noire (Analyse des valeurs limites, Partitionnement par équivalence, Transition d\'état et Tables de décision) pour créer et exécuter efficacement des cas de test</li></ul><h3>Techniques d\'estimation</h3><ul><li>Utiliser les techniques d\'estimation avec précision pour améliorer l\'efficacité globale et la productivité du processus de test</li></ul><h3>Identifier et traiter les problèmes</h3><ul><li>Identifier et traiter les problèmes tôt dans le cycle de développement avec des stratégies telles que la priorisation des cas de test et le développement piloté par les tests d\'acceptation (ATDD)</li></ul><h3>Créer des plans de test efficaces</h3><ul><li>Créer un plan de test efficace qui fournit un cadre et une structure couvrant les composants critiques nécessaires à toutes les parties prenantes pour assurer un test réussi</li></ul>',
            'exam_structure_details' => '<h3>Structure de l\'examen</h3><p>L\'examen de certification A4Q Practical Tester est basé sur le syllabus A4Q Practical Tester. Les candidats sont évalués par rapport aux "Objectifs pratiques" et doivent démontrer leur capacité à appliquer efficacement et précisément les techniques et approches.</p><h4>Format de l\'évaluation</h4><ul><li>Format <strong>texte ouvert</strong> (l\'examen ne comprend pas de questions à choix multiples)</li><li>Les évaluateurs recherchent des réponses complètes et exhaustives alignées sur le syllabus</li><li>Vous devez correctement appliquer les techniques de test</li><li>Créer des cas de test, rapports de défauts et plans de test</li></ul><h4>Alignement avec ISTQB®</h4><p>L\'A4Q Practical Tester est étroitement aligné avec le schéma de certification ISTQB® et utilise les mêmes termes de glossaire et formulations. Pour tirer le meilleur parti de l\'A4Q Practical Tester, la certification ISTQB® Certified Tester Foundation Level (CTFL) est fortement recommandée.</p><p><em>Cependant, détenir l\'ISTQB® CTFL n\'est pas un prérequis pour réussir l\'examen A4Q Practical Tester.</em></p>',
            'business_outcomes' => '<ul><li><h4>Démontrez votre savoir-faire pratique</h4><p>Contrairement aux examens standard à choix multiples basés sur les connaissances, l\'examen A4Q Practical Tester évalue votre compétence réelle</p></li><li><h4>Validation des compétences pratiques</h4><p>Les titulaires de la certification A4Q Practical Tester ont démontré qu\'ils peuvent utiliser leurs connaissances en test dans des scénarios réels</p></li><li><h4>Développement de carrière</h4><p>Que vous soyez nouveau dans le test ou testeur expérimenté, l\'A4Q Practical Tester vous équipe des compétences pratiques et connaissances très demandées par les équipes de développement logiciel actuelles</p></li><li><h4>Complément idéal à ISTQB® CTFL</h4><p>Idéal pour quiconque a déjà obtenu une qualification en test logiciel et souhaite maintenant valider sa capacité à appliquer pratiquement ses connaissances</p></li></ul>',
            'additional_information' => '<h4>Préparation à l\'examen</h4><p>L\'application A4Q Practical Tester est un puissant outil d\'apprentissage supportant la préparation à l\'examen. Les candidats peuvent également participer à un cours de formation A4Q Practical Tester dispensé par un instructeur, où ils sont guidés à travers le syllabus en utilisant l\'outil d\'apprentissage pour renforcer le développement de leurs compétences.</p><h4>Feuille de route d\'apprentissage</h4><p>L\'A4Q Practical Tester fournit une feuille de route pour les apprenants afin de développer une boîte à outils complète de compétences en test applicables aux situations réelles. L\'A4Q Practical Tester complète l\'ISTQB® Certified Tester Foundation Level 4.0 (CTFL 4.0).</p><h4>Ce que vous apprendrez</h4><p>Lors du lancement de l\'A4Q Practical Tester, l\'équipe A4Q a interrogé des centaines de responsables de test et de nombreux organismes de formation sur ce qu\'ils attendent d\'une certification de testeur. Le retour était clair : ils préfèrent tous une approche pratique pour la formation et les examens. L\'accent devrait passer de la formation basée sur les connaissances à la formation basée sur les compétences.</p>',
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
}
