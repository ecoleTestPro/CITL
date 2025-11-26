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
        Schema::create('certified_tester_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->text('address');
            $table->date('date_of_birth');
            $table->string('email');
            $table->string('phone', 50);
            $table->string('certification_obtained');
            $table->string('certificate_number', 100);
            $table->string('test_center');
            $table->date('exam_date');
            $table->boolean('consent')->default(true);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('email');
            $table->index('certificate_number');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certified_tester_registrations');
    }
};
