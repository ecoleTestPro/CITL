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
        // Pages table
        Schema::create('cms_pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->json('content')->nullable(); // Editor.js JSON content
            $table->string('status')->default('draft'); // draft, published
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('featured_image')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        // Menus table
        Schema::create('cms_menus', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location')->unique(); // header, footer
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Menu items table
        Schema::create('cms_menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained('cms_menus')->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained('cms_menu_items')->onDelete('cascade');
            $table->string('title');
            $table->string('url')->nullable();
            $table->foreignId('page_id')->nullable()->constrained('cms_pages')->onDelete('cascade');
            $table->string('target')->default('_self');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cms_menu_items');
        Schema::dropIfExists('cms_menus');
        Schema::dropIfExists('cms_pages');
    }
};
