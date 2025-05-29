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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_location_id')
                ->constrained('project_loacations')
                ->onDelete('cascade')
                ->onUpdate('cascade')
                ->comment('Foreign key to project locations table');
            $table->json('title')->comment('Project title');
            $table->json('content')->comment('Project content');
            $table->string('image')->comment('Project image ');
            $table->json('project_name')->comment('Project project_name');
            $table->json('client_name')->comment('Project client_name');
            $table->json('location')->comment('Project location');
            $table->json('slug')->comment('Project slug');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
