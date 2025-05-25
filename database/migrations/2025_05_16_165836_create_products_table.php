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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mainproduct_id')->constrained('main_products')->cascadeOnDelete()->cascadeOnUpdate();
            $table->json('title');
            $table->json('description');
            $table->json('content');
            $table->string('image');
            $table->string('pdf');
            $table->json('uses');
            $table->json('advantages');
            $table->string('color');
            $table->boolean('special')->default(false);
            $table->json('slug');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
