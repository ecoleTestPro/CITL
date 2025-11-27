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
            $table->text('overview')->nullable()->after('description');
            $table->text('target_audience')->nullable()->after('overview');
            $table->text('training_content')->nullable()->after('target_audience');
            $table->text('exam_structure_details')->nullable()->after('training_content');
            $table->text('business_outcomes')->nullable()->after('exam_structure_details');
            $table->text('additional_information')->nullable()->after('business_outcomes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certifications', function (Blueprint $table) {
            $table->dropColumn([
                'overview',
                'target_audience',
                'training_content',
                'exam_structure_details',
                'business_outcomes',
                'additional_information',
            ]);
        });
    }
};
