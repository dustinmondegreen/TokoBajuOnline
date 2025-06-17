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
            $table->string('product_id')->primary(); // Primary Key dengan panjang 5 karakter
            $table->string('product_name'); // Nama produk
            $table->string('category'); // Kategori produk
            $table->decimal('price', 10, 2); // Harga produk
            $table->integer('quantity'); // Jumlah stok
            $table->string('material'); // Bahan produk
            $table->string('color'); // Warna produk
            $table->string('image'); // Path gambar produk

            $table->timestamps(); // created_at & updated_at
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
