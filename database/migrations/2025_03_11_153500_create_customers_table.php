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
            $table->string('customer_id')->primary(); // Format: C0001
            $table->string('customer_name');
            $table->integer('customer_age');
            $table->string('customer_email')->unique();
            $table->string('customer_phone_number')->unique();
            $table->string('customer_address');
            $table->string('password', 60); // Tambah kolom password
            $table->timestamps(); // created_at & updated_at
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
