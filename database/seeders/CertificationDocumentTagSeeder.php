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
            ['name' => 'Syllabus', 'slug' => 'syllabus', 'color' => 'blue', 'order' => 1],
            ['name' => 'Formation', 'slug' => 'formation', 'color' => 'green', 'order' => 2],
            ['name' => 'Examen blanc', 'slug' => 'examen-blanc', 'color' => 'purple', 'order' => 3],
            ['name' => 'Guide', 'slug' => 'guide', 'color' => 'orange', 'order' => 4],
            ['name' => 'Documentation', 'slug' => 'documentation', 'color' => 'red', 'order' => 5],
            ['name' => 'Ressources', 'slug' => 'ressources', 'color' => 'yellow', 'order' => 6],
        ];

        foreach ($tags as $tag) {
            CertificationDocumentTag::updateOrCreate(
                ['slug' => $tag['slug']],
                $tag
            );
        }
    }
}
