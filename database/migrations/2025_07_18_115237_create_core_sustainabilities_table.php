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
        Schema::create('core_sustainabilities', function (Blueprint $table) {
            $table->id();
            $table->json('title')->nullable();
            $table->json('content')->nullable();
            $table->string('image');
            $table->string('color');
            $table->unsignedBigInteger('sustainable_id')->nullable();
            $table->string('sustainable_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('core_sustainabilities');
    }
};
