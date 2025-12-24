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
        Schema::create('email_logs', function (Blueprint $table) {
            $table->id();
            $table->string('mailable_type'); // La classe Mail utilisée
            $table->string('mailable_id')->nullable(); // ID du modèle associé (si applicable)
            $table->string('request_type'); // exam_registration, accreditation, membership, certified_tester, contact
            $table->string('recipient_email');
            $table->string('recipient_name')->nullable();
            $table->string('sender_email')->nullable();
            $table->string('sender_name')->nullable();
            $table->string('subject');
            $table->enum('status', ['pending', 'sent', 'failed'])->default('pending');
            $table->text('error_message')->nullable();
            $table->json('metadata')->nullable(); // Données supplémentaires
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();

            $table->index('request_type');
            $table->index('status');
            $table->index('recipient_email');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_logs');
    }
};
