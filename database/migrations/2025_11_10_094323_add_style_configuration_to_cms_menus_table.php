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
        Schema::table('cms_menus', function (Blueprint $table) {
            $table->string('style_template')->default('default')->after('location'); // Style template: default, logo-center-cta, logo-menu, custom
            $table->boolean('is_sticky')->default(false)->after('style_template'); // Sticky menu option
            $table->json('style_config')->nullable()->after('is_sticky'); // JSON config for logo, search, CTA button, etc.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cms_menus', function (Blueprint $table) {
            $table->dropColumn(['style_template', 'is_sticky', 'style_config']);
        });
    }
};
