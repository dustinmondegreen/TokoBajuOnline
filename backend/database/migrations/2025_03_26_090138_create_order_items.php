<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->string('order_id'); // Mengikuti tipe data di orders
            $table->string('product_id'); // Mengikuti tipe data di products
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->timestamps();

            // Menambahkan foreign key dengan tipe data yang sesuai
            $table->foreign('order_id')->references('order_id')->on('orders')->onDelete('cascade');
            $table->foreign('product_id')->references('product_id')->on('products')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};