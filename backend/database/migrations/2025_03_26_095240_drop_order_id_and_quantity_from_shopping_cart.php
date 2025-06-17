<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('shopping_carts', function (Blueprint $table) {
            // Hapus foreign key jika ada
            $table->dropForeign(['order_id']);
            // Hapus kolom
            $table->dropColumn(['order_id']);
        });
    }

    public function down(): void {
        Schema::table('shopping_carts', function (Blueprint $table) {
            $table->unsignedBigInteger('order_id')->nullable();
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }
};
