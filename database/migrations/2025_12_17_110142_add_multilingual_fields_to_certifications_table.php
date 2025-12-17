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
        Schema::table('certifications', function (Blueprint $table) {
            // Rename existing fields to French versions
            $table->renameColumn('title', 'title_fr');
            $table->renameColumn('subtitle', 'subtitle_fr');
            $table->renameColumn('description', 'description_fr');
        });

        Schema::table('certifications', function (Blueprint $table) {
            // Add English versions
            $table->string('title_en')->nullable()->after('title_fr');
            $table->string('subtitle_en')->nullable()->after('subtitle_fr');
            $table->text('description_en')->nullable()->after('description_fr');

            // Add English versions for rich text content fields
            $table->longText('overview_en')->nullable()->after('overview');
            $table->longText('target_audience_en')->nullable()->after('target_audience');
            $table->longText('training_content_en')->nullable()->after('training_content');
            $table->longText('exam_structure_details_en')->nullable()->after('exam_structure_details');
            $table->longText('business_outcomes_en')->nullable()->after('business_outcomes');
            $table->longText('additional_information_en')->nullable()->after('additional_information');
        });

        // Rename rich text fields to French versions
        Schema::table('certifications', function (Blueprint $table) {
            $table->renameColumn('overview', 'overview_fr');
            $table->renameColumn('target_audience', 'target_audience_fr');
            $table->renameColumn('training_content', 'training_content_fr');
            $table->renameColumn('exam_structure_details', 'exam_structure_details_fr');
            $table->renameColumn('business_outcomes', 'business_outcomes_fr');
            $table->renameColumn('additional_information', 'additional_information_fr');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certifications', function (Blueprint $table) {
            // Drop English columns
            $table->dropColumn([
                'title_en',
                'subtitle_en',
                'description_en',
                'overview_en',
                'target_audience_en',
                'training_content_en',
                'exam_structure_details_en',
                'business_outcomes_en',
                'additional_information_en',
            ]);
        });

        Schema::table('certifications', function (Blueprint $table) {
            // Rename back to original names
            $table->renameColumn('title_fr', 'title');
            $table->renameColumn('subtitle_fr', 'subtitle');
            $table->renameColumn('description_fr', 'description');
            $table->renameColumn('overview_fr', 'overview');
            $table->renameColumn('target_audience_fr', 'target_audience');
            $table->renameColumn('training_content_fr', 'training_content');
            $table->renameColumn('exam_structure_details_fr', 'exam_structure_details');
            $table->renameColumn('business_outcomes_fr', 'business_outcomes');
            $table->renameColumn('additional_information_fr', 'additional_information');
        });
    }
};
