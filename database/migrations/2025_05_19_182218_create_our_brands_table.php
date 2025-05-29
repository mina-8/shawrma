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
        Schema::create('our_brands', function (Blueprint $table) {
            $table->id();
            $table->string('banner')->nullable();
            $table->json('header_title');
            $table->json('title');
            $table->json('content');
            $table->string('color')->nullable();
            $table->string('image');
            $table->string('pdf');
            $table->json('slug');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('our_brands');
    }
};
