<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ShoppingCartController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReviewController;
use App\Models\Customer;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::bind('customer', function ($value) {
    return Customer::where('customer_id', $value)->firstOrFail();
});

Route::put('/customers/{customer_id}', [CustomerController::class, 'update']);
Route::apiResource('customers', CustomerController::class)->except(['update']);

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
    Route::post('/', [OrderController::class, 'checkout']);
    Route::get('/', [OrderController::class, 'index']);
    Route::get('/{order_id}', [OrderController::class, 'show']);
    Route::patch('/{order_id}', [OrderController::class, 'update']);
    Route::patch('/{order_id}/status', [OrderController::class, 'updateStatus']);
    Route::delete('/{order_id}', [OrderController::class, 'destroy']);
});


Route::prefix('cart')->group(function () {
    Route::get('/', [ShoppingCartController::class, 'index']); // Tampilkan semua isi keranjang
    Route::post('/', [ShoppingCartController::class, 'store']); // Tambah item ke keranjang
    Route::get('/{id}', [ShoppingCartController::class, 'show']); // Detail item di keranjang
    Route::delete('/{id}', [ShoppingCartController::class, 'destroy']); // Hapus item di keranjang
});

Route::prefix('payments')->group(function () {
    Route::get('/', [PaymentController::class, 'index']); // Ambil semua payment
    Route::post('/', [PaymentController::class, 'store']); // Buat pembayaran
    Route::get('/{order_id}', [PaymentController::class, 'show']); // Lihat pembayaran berdasarkan order
});

Route::get('/reviews/by-product/{product_id}', [ReviewController::class, 'getByProduct']);

Route::prefix('reviews')->group(function () {
    Route::get('/', [ReviewController::class, 'index']); // GET /api/reviews
    Route::post('/', [ReviewController::class, 'store']); // POST /api/reviews
    Route::get('/{review_id}', [ReviewController::class, 'show']);
});

use App\Http\Controllers\Api\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
