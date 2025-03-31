<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ShoppingCartController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReviewController;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});


Route::apiResource('customers', CustomerController::class);

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']); // View all products
    Route::get('/{id}', [ProductController::class, 'show']); // View single product

    // Routes for admin only (create, update, delete)
    Route::post('/', [ProductController::class, 'store']); // Create product
    Route::put('/{id}', [ProductController::class, 'update']); // Update product
    Route::delete('/{id}', [ProductController::class, 'destroy']); // Delete product
});


Route::prefix('orders')->group(function () {
    // Membuat order baru (POST)
    Route::post('/', [OrderController::class, 'store']);

    // Menampilkan semua order (GET)
    Route::get('/', [OrderController::class, 'index']);

    // Menampilkan detail order (GET)
    Route::get('/{id}', [OrderController::class, 'show'])->where('id', '\d+');

    // Memperbarui order (PATCH)
    Route::patch('/{id}', [OrderController::class, 'update'])->where('id', '\d+');

    // Mengubah status pengiriman (PATCH)
    Route::patch('/{id}/status', [OrderController::class, 'updateStatus'])->where('id', '\d+');

    // Menghapus order (DELETE)
    Route::delete('/{id}', [OrderController::class, 'destroy'])->where('id', '\d+');
});


Route::prefix('cart')->group(function () {
    Route::get('/', [ShoppingCartController::class, 'index']); // Tampilkan semua isi keranjang
    Route::post('/', [ShoppingCartController::class, 'store']); // Tambah item ke keranjang
    Route::get('/{id}', [ShoppingCartController::class, 'show']); // Detail item di keranjang
    Route::delete('/{id}', [ShoppingCartController::class, 'destroy']); // Hapus item di keranjang
});

Route::prefix('payments')->group(function () {
    Route::post('/', [PaymentController::class, 'store']); // Buat pembayaran
    Route::get('/{order_id}', [PaymentController::class, 'show']); // Lihat pembayaran berdasarkan order
});

Route::prefix('reviews')->group(function () {
    Route::get('/', [ReviewController::class, 'index']); // GET /api/reviews
    Route::post('/', [ReviewController::class, 'store']); // POST /api/reviews
    Route::get('/{review_id}', [ReviewController::class, 'show']); // GET /api/reviews/{review_id}
});

