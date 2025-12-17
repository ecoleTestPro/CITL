<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('certification_categories', function (Blueprint $table) {
            // Renommer les colonnes existantes en _fr
            $table->renameColumn('name', 'name_fr');
            $table->renameColumn('description', 'description_fr');
        });

        Schema::table('certification_categories', function (Blueprint $table) {
            // Ajouter les colonnes _en
            $table->string('name_en')->nullable()->after('name_fr');
            $table->text('description_en')->nullable()->after('description_fr');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certification_categories', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en']);
        });

        Schema::table('certification_categories', function (Blueprint $table) {
            $table->renameColumn('name_fr', 'name');
            $table->renameColumn('description_fr', 'description');
        });
    }
};
