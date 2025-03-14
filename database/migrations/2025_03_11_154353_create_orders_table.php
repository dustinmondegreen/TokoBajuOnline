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
        Schema::create('orders', function (Blueprint $table) {
            $table->char('OrderID')->primary();
            $table->char('CustomerID');
            $table->foreign('CustomerID')->references('CustomerID')->on('customers')->onDelete('cascade');
            $table->string('ShippingAddress');
            $table->string('OrderStatus');
            $table->decimal('TotalAmount', 10, 2);
            $table->date('OrderDate'); // Sudah diperbaiki dari 'OderDate'
            $table->date('DeliveryDate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
