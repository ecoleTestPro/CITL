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
        Schema::create('membership_applications', function (Blueprint $table) {
            $table->id();
            $table->string('membership_type'); // new or renewal
            $table->string('first_name');
            $table->string('surname');
            $table->string('phone');
            $table->string('email');
            $table->string('address');
            $table->string('company');
            $table->string('job_title');
            $table->string('years_of_experience');
            $table->string('membership_level'); // student, professional, expert
            $table->string('qualification')->nullable();
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_applications');
    }
};
