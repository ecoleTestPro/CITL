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
                'title' => 'Révolutionner les Tests Logiciels en Côte d\'Ivoire : Votre Guide Complet',
                'organization' => 'CITL - Comité Ivoirien des Tests Logiciels',
                'description' => '<p>Le <strong>CITL</strong>, représentant officiel <strong>ISTQB</strong> en Côte d\'Ivoire, vous invite à son webinaire pour :</p>
<ul>
<li>Comprendre le rôle du CITL</li>
<li>Découvrir les opportunités de certification ISTQB</li>
<li>Rejoindre une communauté nationale de testeurs</li>
<li>Contribuer à l\'élévation des standards qualité</li>
</ul>
<p><strong>Heure :</strong> 20h30 GMT<br><strong>Lien MS Teams :</strong> <a href="https://lnkd.in/eQhbdXxj" target="_blank">Rejoindre le webinaire</a></p>
<p><strong>Intervenant :</strong> Alexis N. - Président CITL</p>
<p>Pour plus d\'informations : <a href="mailto:contact@citl-istqb.org">contact@citl-istqb.org</a> / +225 27 22 39 18 67</p>',
                'start_date' => '2025-12-18',
                'end_date' => '2025-12-18',
                'location' => 'En ligne - MS Teams (https://lnkd.in/eQhbdXxj)',
                'tags' => ['Webinaire', 'ISTQB', 'CITL', 'Certification', 'QA', 'Test Logiciel'],
                'is_active' => true,
                'order' => 1,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
