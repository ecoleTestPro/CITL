<?php

namespace Database\Seeders;

use App\Models\Glossary;
use Illuminate\Database\Seeder;

class GlossarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $glossaries = [

        ];

        foreach ($glossaries as $glossary) {
            Glossary::create($glossary);
        }
    }
}
