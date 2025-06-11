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
            $table->string('payment_id')->primary(); // Menggunakan string sebagai primary key
            $table->string('order_id'); // Menggunakan string
            $table->foreign('order_id')->references('order_id')->on('orders')->onDelete('cascade');
            $table->string('payment_status');
            $table->string('payment_method');
            $table->date('payment_date');
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
