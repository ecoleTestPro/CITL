<?php

namespace Database\Seeders;

use App\Models\Certification\Certification;
use App\Models\Certification\CertificationCategory;
use Illuminate\Database\Seeder;

class A4QCertificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create A4Q category if it doesn't exist
        $a4q = CertificationCategory::firstOrCreate(
            ['key' => 'a4q'],
            [
                'name' => 'A4Q',
                'slug' => 'a4q',
                'description' => 'Certifications A4Q - Alliance for Qualification',
                'order' => 6,
                'is_active' => true,
                'can_delete' => false,
            ]
        );

        // Create A4Q Practical Tester certification if it doesn't exist
        Certification::firstOrCreate(
            ['slug' => 'a4q-practical-tester'],
            [
                'certification_category_id' => $a4q->id,
                'title' => 'A4Q Practical Tester',
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
            ]
        );
    }
}
