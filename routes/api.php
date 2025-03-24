<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\ProductController;

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