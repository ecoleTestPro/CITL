<?php

namespace Database\Seeders;

use App\Models\Certificate\CertificationDocumentTag;
use Illuminate\Database\Seeder;

class CertificationDocumentTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            [
                'name' => 'Syllabus officiel',
                'slug' => 'syllabus-officiel',
                'description' => 'Programme officiel de la certification',
                'order' => 1
            ],
            [
                'name' => 'Guide de formation',
                'slug' => 'guide-formation',
                'description' => 'Documents de support pour la formation',
                'order' => 2
            ],
            [
                'name' => 'Examen blanc',
                'slug' => 'examen-blanc',
                'description' => 'Exemples d\'examens et questions pratiques',
                'order' => 3
            ],
            [
                'name' => 'Documentation complémentaire',
                'slug' => 'documentation-complementaire',
                'description' => 'Ressources additionnelles et références',
                'order' => 4
            ],
            [
                'name' => 'Glossaire',
                'slug' => 'glossaire',
                'description' => 'Termes et définitions clés',
                'order' => 5
            ],
        ];

        foreach ($tags as $tag) {
            CertificationDocumentTag::updateOrCreate(
                ['slug' => $tag['slug']],
                $tag
            );
        }
    }
}
