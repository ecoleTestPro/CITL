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
                'order' => 1
            ],
            [
                'name' => 'Guide de formation',
                'slug' => 'guide-formation',
                'order' => 2
            ],
            [
                'name' => 'Examen blanc',
                'slug' => 'examen-blanc',
                'order' => 3
            ],
            [
                'name' => 'Documentation complémentaire',
                'slug' => 'documentation-complementaire',
                'order' => 4
            ],
            [
                'name' => 'Glossaire',
                'slug' => 'glossaire',
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
