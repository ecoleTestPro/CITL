<?php

namespace Database\Seeders;

use App\Models\Blog\Blog;
use App\Models\Blog\BlogCategory;
use App\Models\User\User;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer les catégories de blog
        $categories = [
            [
                'name' => 'Certifications',
                'slug' => 'certifications',
                'description' => 'Articles sur les certifications ISTQB et A4Q',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'name' => 'Tests Logiciels',
                'slug' => 'tests-logiciels',
                'description' => 'Bonnes pratiques et techniques de test',
                'is_active' => true,
                'order' => 2,
            ],
            [
                'name' => 'Actualités',
                'slug' => 'actualites',
                'description' => 'Actualités du CITL et du monde des tests',
                'is_active' => true,
                'order' => 3,
            ],
        ];

        foreach ($categories as $categoryData) {
            BlogCategory::updateOrCreate(
                ['slug' => $categoryData['slug']],
                $categoryData
            );
        }

        // Récupérer les catégories créées
        $certificationCategory = BlogCategory::where('slug', 'certifications')->first();
        $testsCategory = BlogCategory::where('slug', 'tests-logiciels')->first();
        $actualitesCategory = BlogCategory::where('slug', 'actualites')->first();

        // Récupérer le premier utilisateur ou créer un utilisateur de démonstration
        $author = User::first() ?? User::factory()->create([
            'name' => 'CITL Admin',
            'email' => 'admin@citl.ci',
        ]);

        // Article 1 : Certification ISTQB Foundation Level
        Blog::updateOrCreate(
            ['slug' => 'pourquoi-obtenir-certification-istqb-foundation-level'],
            [
                'blog_category_id' => $certificationCategory->id,
                'user_id' => $author->id,
                'title' => 'Pourquoi obtenir la certification ISTQB Foundation Level ?',
                'slug' => 'pourquoi-obtenir-certification-istqb-foundation-level',
                'excerpt' => 'Découvrez les avantages de la certification ISTQB Foundation Level et comment elle peut booster votre carrière dans les tests logiciels.',
                'content' => '<h2>Introduction</h2>
<p>La certification ISTQB Foundation Level est devenue une référence mondiale dans le domaine des tests logiciels. En Côte d\'Ivoire, le CITL (Centre Ivoirien de Test Logiciel) accompagne les professionnels dans leur parcours de certification.</p>

<h2>Qu\'est-ce que la certification ISTQB Foundation Level ?</h2>
<p>L\'ISTQB Foundation Level est le premier niveau de certification proposé par l\'International Software Testing Qualifications Board. Elle couvre les concepts fondamentaux des tests logiciels, les techniques de test, et la gestion des activités de test.</p>

<h3>Les principaux domaines couverts :</h3>
<ul>
<li><strong>Fondamentaux des tests</strong> : Comprendre pourquoi les tests sont nécessaires et leurs objectifs</li>
<li><strong>Cycle de vie des tests</strong> : Intégration des tests dans le cycle de développement logiciel</li>
<li><strong>Techniques de test</strong> : Boîte noire, boîte blanche, tests basés sur l\'expérience</li>
<li><strong>Gestion des tests</strong> : Planification, estimation, suivi et contrôle</li>
<li><strong>Outils de test</strong> : Types d\'outils et leur utilisation efficace</li>
</ul>

<h2>Les avantages de la certification</h2>

<h3>1. Reconnaissance internationale</h3>
<p>La certification ISTQB est reconnue dans plus de 120 pays. Elle constitue un gage de compétence reconnu par les employeurs du monde entier.</p>

<h3>2. Amélioration des compétences</h3>
<p>La préparation à la certification vous permet d\'acquérir une vision structurée et complète des tests logiciels, d\'améliorer vos pratiques quotidiennes et de standardiser votre vocabulaire professionnel.</p>

<h3>3. Évolution de carrière</h3>
<p>Les professionnels certifiés ISTQB ont généralement accès à de meilleures opportunités d\'emploi, des salaires plus élevés et une progression de carrière plus rapide.</p>

<h3>4. Crédibilité professionnelle</h3>
<p>La certification démontre votre engagement envers l\'excellence et votre volonté de rester à jour avec les meilleures pratiques de l\'industrie.</p>

<h2>Comment se préparer avec le CITL ?</h2>
<p>Le CITL propose des formations adaptées pour préparer la certification ISTQB Foundation Level :</p>

<ul>
<li><strong>Formations en présentiel</strong> : Sessions de 3 jours avec formateurs certifiés</li>
<li><strong>Matériel pédagogique complet</strong> : Supports de cours, exercices pratiques, examens blancs</li>
<li><strong>Accompagnement personnalisé</strong> : Suivi individuel pour maximiser vos chances de réussite</li>
<li><strong>Organisation des examens</strong> : Le CITL organise régulièrement des sessions d\'examen</li>
</ul>

<h2>Statistiques et taux de réussite</h2>
<p>Les participants formés par le CITL affichent un taux de réussite supérieur à 85% à l\'examen ISTQB Foundation Level, grâce à la qualité de la formation et de l\'accompagnement proposés.</p>

<h2>Conclusion</h2>
<p>Obtenir la certification ISTQB Foundation Level est un investissement dans votre avenir professionnel. Elle vous ouvre les portes d\'une carrière enrichissante dans les tests logiciels et vous permet de contribuer activement à la qualité des produits logiciels.</p>

<p><strong>Prêt à franchir le pas ?</strong> Contactez le CITL dès aujourd\'hui pour en savoir plus sur nos prochaines sessions de formation et d\'examen.</p>',
                'featured_image' => null,
                'tags' => ['ISTQB', 'Certification', 'Foundation Level', 'Formation', 'Tests Logiciels'],
                'is_published' => true,
                'published_at' => now()->subDays(10),
                'meta_title' => 'Certification ISTQB Foundation Level - Guide Complet CITL',
                'meta_description' => 'Découvrez pourquoi la certification ISTQB Foundation Level est essentielle pour votre carrière et comment le CITL vous accompagne vers la réussite.',
                'meta_keywords' => ['ISTQB', 'certification', 'tests logiciels', 'CITL', 'Côte d\'Ivoire', 'formation'],
            ]
        );

        // Article 2 : Bonnes pratiques de tests
        Blog::updateOrCreate(
            ['slug' => 'top-10-bonnes-pratiques-tests-logiciels-2024'],
            [
                'blog_category_id' => $testsCategory->id,
                'user_id' => $author->id,
                'title' => 'Top 10 des bonnes pratiques en tests logiciels pour 2024',
                'slug' => 'top-10-bonnes-pratiques-tests-logiciels-2024',
                'excerpt' => 'Explorez les meilleures pratiques actuelles en matière de tests logiciels pour garantir la qualité de vos applications.',
                'content' => '<h2>Introduction</h2>
<p>Dans un monde où la qualité logicielle est devenue un facteur différenciant majeur, l\'adoption de bonnes pratiques en tests est essentielle. Voici notre sélection des 10 pratiques incontournables pour 2024.</p>

<h2>1. Shift-Left Testing : Tester plus tôt</h2>
<p>Le principe du "Shift-Left" consiste à intégrer les tests dès les premières phases du développement. Cette approche permet de détecter les défauts plus tôt, ce qui réduit considérablement les coûts de correction.</p>

<h3>Avantages :</h3>
<ul>
<li>Détection précoce des défauts</li>
<li>Réduction des coûts de correction</li>
<li>Amélioration de la collaboration entre équipes</li>
<li>Meilleure qualité du produit final</li>
</ul>

<h2>2. Automatisation intelligente des tests</h2>
<p>L\'automatisation des tests n\'est plus une option mais une nécessité. Cependant, il est crucial d\'automatiser intelligemment en se concentrant sur les tests à forte valeur ajoutée.</p>

<h3>Que faut-il automatiser ?</h3>
<ul>
<li>Tests de régression</li>
<li>Tests de fumée (smoke tests)</li>
<li>Tests de performance</li>
<li>Tests API</li>
</ul>

<h2>3. Tests basés sur les risques</h2>
<p>Prioriser les efforts de test en fonction des risques permet d\'optimiser l\'allocation des ressources. Identifiez les fonctionnalités critiques et concentrez vos efforts de test sur celles-ci.</p>

<h2>4. Intégration continue et tests continus</h2>
<p>L\'intégration des tests dans les pipelines CI/CD garantit que chaque modification de code est testée automatiquement, réduisant ainsi le risque d\'introduire des régressions.</p>

<h2>5. Tests exploratoires structurés</h2>
<p>Les tests exploratoires complètent les tests scriptés en permettant aux testeurs d\'utiliser leur créativité et leur expérience pour découvrir des défauts inattendus.</p>

<h3>Techniques recommandées :</h3>
<ul>
<li>Sessions time-boxées (90-120 minutes)</li>
<li>Charters de test bien définis</li>
<li>Documentation des découvertes</li>
<li>Debriefing après chaque session</li>
</ul>

<h2>6. Tests de performance précoces</h2>
<p>Ne attendez pas la fin du projet pour tester les performances. Intégrez les tests de performance dès le début pour éviter les mauvaises surprises.</p>

<h2>7. Documentation vivante des tests</h2>
<p>Utilisez des outils comme Cucumber ou SpecFlow pour créer une documentation de test lisible par tous les stakeholders, y compris les non-techniques.</p>

<h2>8. Tests de sécurité intégrés</h2>
<p>La sécurité doit être testée à chaque niveau. Intégrez les tests de sécurité dans votre stratégie de test globale :</p>

<ul>
<li>Tests de pénétration</li>
<li>Analyse statique du code</li>
<li>Tests de vulnérabilités</li>
<li>Validation des autorisations</li>
</ul>

<h2>9. Métriques et tableaux de bord</h2>
<p>Utilisez des métriques pertinentes pour piloter vos activités de test :</p>

<ul>
<li>Couverture de code et de tests</li>
<li>Taux de détection de défauts</li>
<li>Temps moyen de résolution</li>
<li>Vélocité des tests automatisés</li>
</ul>

<h2>10. Formation continue de l\'équipe</h2>
<p>Investissez dans la formation continue de vos testeurs. Les technologies et les pratiques évoluent rapidement, et vos équipes doivent rester à jour.</p>

<h3>Formations recommandées :</h3>
<ul>
<li>Certifications ISTQB (Foundation, Advanced, Expert)</li>
<li>Formations sur les outils d\'automatisation</li>
<li>Ateliers pratiques sur les nouvelles méthodologies</li>
<li>Conférences et meetups professionnels</li>
</ul>

<h2>Conclusion</h2>
<p>L\'adoption de ces bonnes pratiques vous permettra d\'améliorer significativement la qualité de vos tests et, par conséquent, la qualité de vos produits logiciels. Le CITL accompagne les entreprises ivoiriennes dans la mise en place de ces pratiques à travers des formations et du conseil.</p>

<p><strong>Besoin d\'accompagnement ?</strong> Contactez le CITL pour bénéficier de l\'expertise de nos formateurs certifiés.</p>',
                'featured_image' => null,
                'tags' => ['Bonnes Pratiques', 'Tests Logiciels', 'Automatisation', 'DevOps', 'Qualité'],
                'is_published' => true,
                'published_at' => now()->subDays(5),
                'meta_title' => 'Top 10 Bonnes Pratiques Tests Logiciels 2024 | CITL',
                'meta_description' => 'Découvrez les 10 meilleures pratiques en tests logiciels pour 2024 : shift-left, automatisation, CI/CD et plus encore.',
                'meta_keywords' => ['bonnes pratiques', 'tests logiciels', 'automatisation', 'shift-left', 'CI/CD', 'qualité'],
            ]
        );

        // Article 3 : Actualités CITL
        Blog::updateOrCreate(
            ['slug' => 'citl-nouveau-centre-formation-tests-cote-ivoire'],
            [
                'blog_category_id' => $actualitesCategory->id,
                'user_id' => $author->id,
                'title' => 'Le CITL : Le nouveau centre de référence pour la formation aux tests logiciels en Côte d\'Ivoire',
                'slug' => 'citl-nouveau-centre-formation-tests-cote-ivoire',
                'excerpt' => 'Le Centre Ivoirien de Test Logiciel (CITL) s\'impose comme la référence en matière de formation et de certification aux tests logiciels en Afrique de l\'Ouest.',
                'content' => '<h2>Une initiative pionnière en Afrique de l\'Ouest</h2>
<p>Le Centre Ivoirien de Test Logiciel (CITL) a été créé pour répondre à un besoin croissant de professionnels qualifiés en tests logiciels en Côte d\'Ivoire et dans la sous-région ouest-africaine.</p>

<h2>Notre mission</h2>
<p>Le CITL a pour mission de :</p>

<ul>
<li>Former des professionnels de haut niveau en tests logiciels</li>
<li>Promouvoir les certifications internationales (ISTQB, A4Q)</li>
<li>Accompagner les entreprises dans l\'amélioration de leurs processus qualité</li>
<li>Contribuer au développement de l\'écosystème technologique ivoirien</li>
</ul>

<h2>Nos offres de formation</h2>

<h3>Certifications ISTQB</h3>
<p>Nous proposons des formations préparatoires aux différents niveaux de certification ISTQB :</p>

<h4>Foundation Level</h4>
<ul>
<li>Durée : 3 jours</li>
<li>Public : Débutants et professionnels souhaitant structurer leurs connaissances</li>
<li>Taux de réussite : 85%+</li>
</ul>

<h4>Advanced Level</h4>
<ul>
<li>Test Manager, Test Analyst, Technical Test Analyst</li>
<li>Durée : 5 jours par module</li>
<li>Prérequis : Foundation Level + expérience pratique</li>
</ul>

<h4>Expert Level</h4>
<ul>
<li>Test Management, Improving the Test Process</li>
<li>Durée : 5 jours par module</li>
<li>Pour les professionnels expérimentés</li>
</ul>

<h3>Certifications A4Q</h3>
<p>Formation A4Q Practical Tester pour une approche pratique des tests logiciels.</p>

<h3>Formations sur mesure</h3>
<p>Nous proposons également des formations personnalisées adaptées aux besoins spécifiques de votre entreprise :</p>

<ul>
<li>Tests d\'API et services web</li>
<li>Automatisation des tests (Selenium, Cypress, etc.)</li>
<li>Tests de performance (JMeter, Gatling)</li>
<li>Tests de sécurité</li>
<li>Tests mobiles</li>
<li>DevOps et CI/CD</li>
</ul>

<h2>Nos formateurs</h2>
<p>Tous nos formateurs sont :</p>

<ul>
<li>Certifiés ISTQB Advanced ou Expert Level</li>
<li>Dotés d\'une expérience professionnelle significative</li>
<li>Formés aux méthodologies pédagogiques modernes</li>
<li>Actifs dans la communauté des tests logiciels</li>
</ul>

<h2>Nos infrastructures</h2>
<p>Le CITL dispose de :</p>

<ul>
<li>Salles de formation équipées de matériel moderne</li>
<li>Laboratoires informatiques pour les travaux pratiques</li>
<li>Plateforme d\'e-learning pour le suivi à distance</li>
<li>Bibliothèque technique spécialisée</li>
</ul>

<h2>Partenariats et accréditations</h2>
<p>Le CITL est partenaire de :</p>

<ul>
<li>ISTQB® (International Software Testing Qualifications Board)</li>
<li>A4Q (Alliance for Qualification)</li>
<li>Organisations professionnelles locales et internationales</li>
</ul>

<h2>Témoignages</h2>

<blockquote>
<p>"La formation ISTQB Foundation Level au CITL a transformé ma manière d\'aborder les tests. Les formateurs sont excellents et le contenu très pratique."</p>
<footer>- Kouadio Jean, Ingénieur Test chez Orange CI</footer>
</blockquote>

<blockquote>
<p>"Grâce à la certification obtenue au CITL, j\'ai pu évoluer vers un poste de Test Manager. Je recommande vivement !"</p>
<footer>- Aminata Traoré, Test Manager chez MTN</footer>
</blockquote>

<h2>Nos prochaines sessions</h2>
<p>Des sessions de formation sont organisées régulièrement. Consultez notre calendrier ou contactez-nous pour connaître les dates des prochaines formations.</p>

<h3>Informations pratiques</h3>
<ul>
<li><strong>Lieu</strong> : Abidjan, Plateau (adresse exacte communiquée lors de l\'inscription)</li>
<li><strong>Horaires</strong> : 9h - 17h (pause déjeuner incluse)</li>
<li><strong>Langues</strong> : Français, Anglais (sur demande)</li>
<li><strong>Certification</strong> : Examen organisé à la fin de chaque formation</li>
</ul>

<h2>Comment s\'inscrire ?</h2>
<p>Pour vous inscrire à nos formations :</p>

<ol>
<li>Consultez notre calendrier de formations</li>
<li>Remplissez le formulaire d\'inscription en ligne</li>
<li>Effectuez le paiement selon les modalités indiquées</li>
<li>Recevez votre confirmation et les détails pratiques</li>
</ol>

<h2>Tarifs</h2>
<p>Nous proposons des tarifs compétitifs et des réductions pour :</p>

<ul>
<li>Inscriptions de groupe (3 personnes et plus)</li>
<li>Étudiants et demandeurs d\'emploi</li>
<li>Membres d\'organisations partenaires</li>
</ul>

<p>Contactez-nous pour obtenir un devis personnalisé.</p>

<h2>Conclusion</h2>
<p>Le CITL est votre partenaire de choix pour développer vos compétences en tests logiciels et obtenir des certifications reconnues internationalement. Rejoignez-nous et faites partie de la communauté des professionnels qualifiés en tests logiciels en Côte d\'Ivoire !</p>

<p><strong>Prêt à démarrer ?</strong> Contactez-nous dès aujourd\'hui pour en savoir plus sur nos formations et vous inscrire à la prochaine session.</p>',
                'featured_image' => null,
                'tags' => ['CITL', 'Formation', 'Côte d\'Ivoire', 'ISTQB', 'Actualités', 'Certification'],
                'is_published' => true,
                'published_at' => now()->subDays(2),
                'meta_title' => 'CITL - Centre de Formation Tests Logiciels en Côte d\'Ivoire',
                'meta_description' => 'Découvrez le CITL, centre de référence pour la formation et la certification aux tests logiciels en Côte d\'Ivoire. Formations ISTQB et A4Q.',
                'meta_keywords' => ['CITL', 'Côte d\'Ivoire', 'formation', 'tests logiciels', 'certification', 'ISTQB', 'Abidjan'],
            ]
        );

        $this->command->info('✅ 3 articles de blog créés avec succès !');
        $this->command->info('📚 Catégories : Certifications, Tests Logiciels, Actualités');
    }
}
