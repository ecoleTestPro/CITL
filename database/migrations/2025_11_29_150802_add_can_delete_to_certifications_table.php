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
            $table->boolean('can_delete')->default(true)->after('is_active');
        });

        // Mark the A4Q Practical Tester as non-deletable
        \DB::table('certifications')
            ->where('slug', 'a4q-practical-tester')
            ->update(['can_delete' => false]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certifications', function (Blueprint $table) {
            $table->dropColumn('can_delete');
        });
    }
};
