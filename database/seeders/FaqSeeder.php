<?php

namespace Database\Seeders;

use App\Models\Faq\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            // Informations générales
            [
                'question' => 'Où puis-je trouver la liste des fournisseurs d\'examens?',
                'answer' => 'Envoyez votre demande à contact@citl-istqb.org ou utilisez le formulaire de contact sur notre page Contact.',
                'category' => 'Informations générales',
                'locale' => 'fr',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Où puis-je trouver la liste des organismes de formation accrédités?',
                'answer' => 'Tous les organismes de formation accrédités sont listés sur notre page Formation.',
                'category' => 'Informations générales',
                'locale' => 'fr',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'Comment obtenir un certificat ISTQB® pour testeurs logiciels?',
                'answer' => 'Vous devez réussir les examens proposés par un fournisseur d\'examens reconnu par l\'ISTQB®. Il existe 3 niveaux de certification : Foundation, Advanced et Expert.',
                'category' => 'Informations générales',
                'locale' => 'fr',
                'order' => 3,
                'is_active' => true,
            ],

            // Niveaux de certification
            [
                'question' => 'Quels sont les examens Foundation Level?',
                'answer' => 'Le niveau Foundation propose les examens suivants :<br/><br/><strong>Foundation Level Core (1 syllabus)</strong><br/><strong>Foundation Level Specialist (8 syllabi, dont 5 actuellement disponibles) :</strong><ul class="list-disc pl-6 mt-2"><li>Agile Tester</li><li>Model-Based Tester</li><li>Usability Testing</li><li>Acceptance Testing</li><li>Automotive Software Tester</li><li>Performance Testing</li><li>Mobile Application Tester</li><li>Gambling Industry Tester (Beta)</li></ul>',
                'category' => 'Niveaux de certification',
                'locale' => 'fr',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Quels sont les examens Advanced Level?',
                'answer' => 'Le niveau Advanced propose 3 examens Core et 3 examens Specialist supplémentaires :<br/><br/><strong>Advanced Level Core (3 syllabi) :</strong><ul class="list-disc pl-6 mt-2"><li>Test Manager</li><li>Test Analyst</li><li>Technical Test Analyst</li></ul><br/><strong>Advanced Level Specialist (3 syllabi) :</strong><ul class="list-disc pl-6 mt-2"><li>Security Tester</li><li>Test Automation Engineer</li><li>Agile Technical Testing (en développement)</li></ul><br/><br/><em>Pour recevoir la certification Advanced Level, les candidats doivent détenir le certificat Foundation.</em>',
                'category' => 'Niveaux de certification',
                'locale' => 'fr',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'Quels sont les examens Expert Level?',
                'answer' => 'Le niveau Expert Core propose les examens suivants (aucun examen Expert Level Specialist n\'est actuellement disponible) : Expert Test Manager et Expert Improving the Test Process.',
                'category' => 'Niveaux de certification',
                'locale' => 'fr',
                'order' => 3,
                'is_active' => true,
            ],

            // Structure des examens
            [
                'question' => 'Quel est le contenu des examens?',
                'answer' => 'Chaque examen contient des questions visant à vérifier les connaissances professionnelles acquises du candidat sur les sujets couverts par les objectifs d\'apprentissage pour le syllabus Foundation, Advanced ou Expert pertinent.',
                'category' => 'Structure des examens',
                'locale' => 'fr',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Comment les questions d\'examen sont-elles structurées?',
                'answer' => 'Les examens Foundation Level et Advanced Level sont basés sur des questions à choix multiples :<ul class="list-disc pl-6 mt-2"><li>Une question à réponse unique a 4 options suggérées, dont une, et une seule, est correcte.</li><li>Pour une question Pick-N, le candidat se voit présenter 5 options suggérées, avec 2 options correctes à sélectionner.</li></ul><br/>Les examens Expert Level contiennent à la fois des questions à choix multiples et des questions de type essai nécessitant une réponse écrite détaillée.',
                'category' => 'Structure des examens',
                'locale' => 'fr',
                'order' => 2,
                'is_active' => true,
            ],

            // Notation et résultats
            [
                'question' => 'Comment les scores sont-ils attribués aux réponses?',
                'answer' => '<ul class="list-disc pl-6"><li>Les examens Foundation Level attribuent 1 point pour chaque question correctement répondue.</li><li>Pour les examens Advanced Level, une question K2 se voit attribuer 1 point, tandis qu\'une question K3 peut obtenir 1, 2 ou 3 points, et les questions K4 peuvent obtenir 2 ou 3 points.</li><li>Pour les examens Expert Level, une question K2 se voit attribuer 1 point, une K3 obtient 1, 2 ou 3 points, et les questions K4 peuvent obtenir 2 ou 3 points. Les questions d\'essai (K5 et K6) se voient attribuer le nombre de points défini dans le guide de notation.</li></ul><br/><em>Les réponses incorrectes ou nulles reçoivent zéro point.</em>',
                'category' => 'Notation et résultats',
                'locale' => 'fr',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Comment l\'examen Foundation Level est-il structuré?',
                'answer' => 'L\'examen Foundation Level comprend 40 questions à choix multiples, avec un score de 1 point pour chaque bonne réponse, une note de passage d\'au moins 65% (26 points ou plus) et une durée de 60 minutes (ou 75 minutes pour les candidats ayant bénéficié d\'une extension de temps).',
                'category' => 'Notation et résultats',
                'locale' => 'fr',
                'order' => 2,
                'is_active' => true,
            ],

            // Inscription et prérequis
            [
                'question' => 'Où et quand puis-je passer un examen?',
                'answer' => 'Les examens sont proposés par le CITL. Vous pouvez vous inscrire pour votre examen sur notre page d\'inscription.',
                'category' => 'Inscription et prérequis',
                'locale' => 'fr',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Y a-t-il des prérequis pour passer un examen ISTQB®?',
                'answer' => '<ul class="list-disc pl-6"><li><strong>Foundation Core:</strong> L\'examen Foundation Level Core n\'a pas de prérequis. Une préparation sur les sujets du syllabus est recommandée.</li><li><strong>Specialist:</strong> Pour passer un examen Specialist, le candidat doit détenir un certificat Foundation Level Core.</li><li><strong>Advanced:</strong> Pour passer un examen Advanced Level, le candidat doit détenir le certificat Foundation Level pertinent. L\'ISTQB® recommande également une expérience pratique.</li><li><strong>Expert:</strong> Pour passer l\'examen Expert Level, le candidat doit détenir le certificat Advanced Level approprié. L\'ISTQB® recommande également au moins 7 ans d\'expérience pratique.</li></ul>',
                'category' => 'Inscription et prérequis',
                'locale' => 'fr',
                'order' => 2,
                'is_active' => true,
            ],

            // Certificats et validité
            [
                'question' => 'Quelle est la période de validité de cette certification?',
                'answer' => '<ul class="list-disc pl-6"><li><strong>Foundation & Advanced:</strong> Les certificats ISTQB® Foundation Level et Advanced Level, y compris les Specialist, sont valables à vie.</li><li><strong>Expert:</strong> Les certificats ISTQB® Expert Level sont valables 5 ans et peuvent être renouvelés soit par examen, soit en complétant 200 Crédits d\'Extension de Certification (CEC).</li></ul>',
                'category' => 'Certificats et validité',
                'locale' => 'fr',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Qui dois-je contacter si je n\'ai pas trouvé les informations que je cherchais?',
                'answer' => 'Vous pouvez utiliser le formulaire de contact sur notre page Contact ou envoyer vos questions à contact@citl-istqb.org',
                'category' => 'Certificats et validité',
                'locale' => 'fr',
                'order' => 2,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
