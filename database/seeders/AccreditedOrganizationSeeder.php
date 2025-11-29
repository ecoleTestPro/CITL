<?php

namespace Database\Seeders;

use App\Models\Training\AccreditedOrganization;
use Illuminate\Database\Seeder;

class AccreditedOrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizations = [
            [
                'name' => 'Centre Formation Alpha',
                'country' => "Côte d'Ivoire",
                'city' => 'Abidjan',
                'website' => 'https://www.formation-alpha.ci',
                'email' => 'contact@formation-alpha.ci',
                'phone' => '+225 27 22 00 00 01',
                'logo' => null,
                'description' => 'Centre de formation accrédité par le CITL pour les modules ISTQB Foundation, Advanced et Expert. Notre équipe de formateurs certifiés vous accompagne dans votre parcours de certification.',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'name' => 'Centre Formation Beta',
                'country' => "Côte d'Ivoire",
                'city' => 'Abidjan',
                'website' => 'https://www.formation-beta.ci',
                'email' => 'info@formation-beta.ci',
                'phone' => '+225 27 22 00 00 02',
                'logo' => null,
                'description' => 'Organisme accrédité pour les formations ISTQB Foundation et TMMi. Nous proposons des formations de qualité avec un taux de réussite élevé.',
                'is_active' => true,
                'order' => 2,
            ],
            [
                'name' => 'Centre Formation Gamma',
                'country' => "Côte d'Ivoire",
                'city' => 'Abidjan',
                'website' => 'https://www.formation-gamma.ci',
                'email' => 'contact@formation-gamma.ci',
                'phone' => '+225 27 22 00 00 03',
                'logo' => null,
                'description' => 'Spécialisé dans les certifications ISTQB Foundation, Agile Testing et IREB®. Notre approche pédagogique combine théorie et pratique pour une meilleure préparation aux examens.',
                'is_active' => true,
                'order' => 3,
            ],
        ];

        foreach ($organizations as $organization) {
            AccreditedOrganization::updateOrCreate(
                ['name' => $organization['name']],
                $organization
            );
        }

        $this->command->info('Accredited organizations seeded successfully!');
    }
}
