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
        Schema::create('shopping_carts', function (Blueprint $table) {
            $table->string('cart_id')->primary(); // Ubah ke snake case dan tambahkan panjang char
            $table->string('customer_id'); // Ubah ke snake case dan tambahkan panjang char
            $table->string('product_id'); // Ubah ke snake case dan tambahkan panjang char

            // Perbaiki nama kolom referensi agar sesuai dengan snake case
            $table->foreign('customer_id')->references('customer_id')->on('customers')->onDelete('cascade');
            $table->foreign('product_id')->references('product_id')->on('products')->onDelete('cascade');

            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopping_carts');
    }
};
