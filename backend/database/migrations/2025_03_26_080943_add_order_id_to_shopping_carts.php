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
        Schema::table('shopping_carts', function (Blueprint $table) {
            $table->string('order_id')->nullable()->after('customer_id');
            $table->foreign('order_id')->references('order_id')->on('orders')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shopping_carts', function (Blueprint $table) {
            //
        });
    }
};
