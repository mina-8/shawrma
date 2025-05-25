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
        Schema::create('fact_numbers', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->integer('number');
            $table->string('image');
            $table->unsignedBigInteger('factable_id')->nullable();
            $table->string('factable_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fact_numbers');
    }
};
