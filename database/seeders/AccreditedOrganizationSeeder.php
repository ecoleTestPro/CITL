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
                'name' => 'TestPro',
                'country' => "Côte d'Ivoire",
                'city' => 'Abidjan',
                'website' => 'https://www.testpro-group.com/',
                'email' => 'info@testpro-group.com',
                'phone' => '+225 2722391867, +225 0706915705',
                'logo' => null,
                'description' => 'TestPro — Centre de formation et de certification partenaire.',
                'certifications' => <<<'HTML'
                                        <p><strong>Testeur certifié</strong></p>
                                        <ul>
                                            <li>Niveau Fondation – CTFL – Version 4.0 – Français</li>
                                            <li>Niveau Fondation Agile – Testeur Agile – Français</li>
                                            <li>Niveau Fondation Spécialiste – Tests d’acceptation – v2019 – Français / Anglais</li>
                                            <li>Niveau Avancé – Test Manager – Version 3.0 – 2024 – Français</li>
                                            <li>Niveau Avancé – Analyste de Test – Version 2019 – Français</li>
                                            <li>Niveau Avancé – Analyste Technique de Test – Version 2019 – Français</li>
                                            <li>Niveau Avancé – Ingénieur en Automatisation des Tests – v2 (2024) – Français</li>
                                            <li>Niveau Avancé – Tester avec l’IA Générative – Français</li>
                                        </ul>
                                        <p><a href="https://www.testpro-group.com/" target="_blank" rel="noopener">Site TestPro</a></p>
                                        HTML,
                'is_active' => true,
                'order' => 1,
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
