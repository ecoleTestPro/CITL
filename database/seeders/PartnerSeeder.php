<?php

namespace Database\Seeders;

use App\Models\Partner\Partner;
use App\Models\Partner\PartnerTier;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer les catégories de partenaires
        $tiers = [
            [
                'name' => 'Partenaires Platine CITL',
                'name_en' => 'CITL Platinum Partners',
                'slug' => 'platinum',
                'color' => '#E5E4E2', // Couleur platine
                'icon' => '💎',
                'description' => 'Nos partenaires platine bénéficient d\'une visibilité maximale et d\'un accompagnement privilégié.',
                'description_en' => 'Our platinum partners benefit from maximum visibility and privileged support.',
                'is_active' => true,
            ],
            [
                'name' => 'Partenaires Gold CITL',
                'name_en' => 'CITL Gold Partners',
                'slug' => 'gold',
                'color' => '#FFD700', // Couleur or
                'icon' => '🥇',
                'description' => 'Nos partenaires gold participent activement au développement de l\'excellence en test logiciel.',
                'description_en' => 'Our gold partners actively participate in the development of software testing excellence.',
                'is_active' => true,
            ],
            [
                'name' => 'Partenaires Silver CITL',
                'name_en' => 'CITL Silver Partners',
                'slug' => 'silver',
                'color' => '#C0C0C0', // Couleur argent
                'icon' => '🥈',
                'description' => 'Nos partenaires silver contribuent à la promotion des certifications ISTQB.',
                'description_en' => 'Our silver partners contribute to the promotion of ISTQB certifications.',
                'is_active' => true,
            ],
        ];

        foreach ($tiers as $tierData) {
            PartnerTier::updateOrCreate(
                ['slug' => $tierData['slug']],
                $tierData
            );
        }

        // Récupérer les tiers créés
        $platinumTier = PartnerTier::where('slug', 'platinum')->first();
        $goldTier = PartnerTier::where('slug', 'gold')->first();
        $silverTier = PartnerTier::where('slug', 'silver')->first();

        // Créer quelques partenaires de démonstration
        $partners = [
            // Partenaires Platine
            [
                'partner_tier_id' => $platinumTier->id,
                'name' => 'TechCorp International',
                'slug' => 'techcorp-international',
                'website' => 'https://example.com/techcorp',
                'description' => 'Leader mondial des solutions de test automatisé.',
                'description_en' => 'Global leader in automated testing solutions.',
                'is_active' => true,
            ],
            // Partenaires Gold
            [
                'partner_tier_id' => $goldTier->id,
                'name' => 'QualitySoft CI',
                'slug' => 'qualitysoft-ci',
                'website' => 'https://example.com/qualitysoft',
                'description' => 'Expert en assurance qualité logicielle en Côte d\'Ivoire.',
                'description_en' => 'Software quality assurance expert in Ivory Coast.',
                'is_active' => true,
            ],
            [
                'partner_tier_id' => $goldTier->id,
                'name' => 'TestMaster Africa',
                'slug' => 'testmaster-africa',
                'website' => 'https://example.com/testmaster',
                'description' => 'Centre de formation agréé ISTQB pour l\'Afrique de l\'Ouest.',
                'description_en' => 'ISTQB accredited training center for West Africa.',
                'is_active' => true,
            ],
            // Partenaires Silver
            [
                'partner_tier_id' => $silverTier->id,
                'name' => 'DevOps Solutions',
                'slug' => 'devops-solutions',
                'website' => 'https://example.com/devops',
                'description' => 'Spécialiste DevOps et intégration continue.',
                'description_en' => 'DevOps and continuous integration specialist.',
                'is_active' => true,
            ],
            [
                'partner_tier_id' => $silverTier->id,
                'name' => 'Agile Testing Hub',
                'slug' => 'agile-testing-hub',
                'website' => 'https://example.com/agilehub',
                'description' => 'Communauté de testeurs agiles.',
                'description_en' => 'Agile testers community.',
                'is_active' => true,
            ],
        ];

        foreach ($partners as $partnerData) {
            Partner::updateOrCreate(
                ['slug' => $partnerData['slug']],
                $partnerData
            );
        }
    }
}
