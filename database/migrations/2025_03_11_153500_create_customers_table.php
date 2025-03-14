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
        Schema::create('customers', function (Blueprint $table) {
            $table->char('CustomerID')->primary(); // Primary key
            $table->string('CustomerName');
            $table->integer('CustomerAge');
            $table->string('CustomerEmail')->unique(); // Unique constraint
            $table->string('CustomerPhoneNumber')->unique(); // Unique constraint
            $table->string('CustomerAddress');
            $table->timestamps(); // Created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
