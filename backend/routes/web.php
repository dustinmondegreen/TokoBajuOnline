<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\ProductWebController;

Route::get('/admin/products', [ProductWebController::class, 'index'])->name('admin.products.index');
Route::get('/admin/products/create', [ProductWebController::class, 'create'])->name('admin.products.create');
Route::post('/admin/products', [ProductWebController::class, 'store'])->name('admin.products.store');
Route::get('/admin/products/{product_id}/edit', [ProductWebController::class, 'edit'])->name('admin.products.edit');
Route::put('/admin/products/{product_id}', [ProductWebController::class, 'update'])->name('admin.products.update');
Route::delete('/admin/products/{product_id}', [ProductWebController::class, 'destroy'])->name('admin.products.destroy');


