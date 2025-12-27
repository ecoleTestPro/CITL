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
        Schema::create('partner_tiers', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Platine, Gold, Silver
            $table->string('name_en')->nullable(); // English name
            $table->string('slug')->unique(); // platinum, gold, silver
            $table->string('color')->default('#000000'); // Couleur d'affichage
            $table->string('icon')->nullable(); // Icône optionnelle
            $table->text('description')->nullable();
            $table->text('description_en')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partner_tiers');
    }
};
