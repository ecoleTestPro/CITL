<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Check if term_fr column already exists
        if (! Schema::hasColumn('glossaries', 'term_fr')) {
            Schema::table('glossaries', function (Blueprint $table) {
                // Add French columns with default empty string for SQLite compatibility
                $table->string('term_fr')->default('')->after('term_en');
                $table->text('definition_fr')->default('')->after('definition_en');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('glossaries', function (Blueprint $table) {
            // Remove French columns if they exist
            if (Schema::hasColumn('glossaries', 'term_fr')) {
                $table->dropColumn(['term_fr', 'definition_fr']);
            }
        });
    }
};
