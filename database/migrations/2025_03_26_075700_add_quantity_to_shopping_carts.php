<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('shopping_carts', function (Blueprint $table) {
            $table->integer('quantity')->after('product_id')->default(1); 
            // Menambahkan kolom quantity setelah product_id dengan default 1
        });
    }

    public function down(): void
    {
        Schema::table('shopping_carts', function (Blueprint $table) {
            $table->dropColumn('quantity');
        });
    }
};
