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
        Schema::create('payments', function (Blueprint $table) {
            $table->char('PaymentID')->primary();
            $table->char('OrderID');
            $table->foreign('OrderID')->references('OrderID')->on('orders')->onDelete('cascade');
            $table->string('PaymentStatus');
            $table->string('PaymentMethod');
            $table->date('PaymentDate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
