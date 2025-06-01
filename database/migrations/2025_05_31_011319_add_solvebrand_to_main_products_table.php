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
        Schema::table('main_products', function (Blueprint $table) {
            $table->foreignId('solve_brands_id')->nullable()->constrained('solve_brands')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('main_products', function (Blueprint $table) {
            $table->dropForeign(['solve_brands_id']);
            $table->dropColumn('solve_brands_id');
        });
    }
};
