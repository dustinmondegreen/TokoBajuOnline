<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShoppingCart;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ShoppingCartController extends Controller
{
    // Menampilkan semua item di keranjang beserta produk dan nama customer
    public function index()
    {
        $carts = ShoppingCart::with(['product', 'customer'])->get();

        return response()->json([
            'success' => true,
            'data' => $carts
        ], Response::HTTP_OK);
    }

    // Menambahkan item ke keranjang
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,customer_id',
            'product_id' => 'required|exists:products,product_id',
        ]);

        $cart_id = ShoppingCart::generateCartId();

        $cart = ShoppingCart::create([
            'cart_id' => $cart_id,
            'customer_id' => $validated['customer_id'],
            'product_id' => $validated['product_id'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan ke keranjang.',
            'data' => $cart
        ], Response::HTTP_CREATED);
    }

    // Menampilkan detail item di keranjang berdasarkan ID
    public function show($id)
    {
        $cart = ShoppingCart::with(['product', 'customer'])->where('cart_id', $id)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $cart
        ], Response::HTTP_OK);
    }

    // Menghapus item dari keranjang
    public function destroy($id)
    {
        $cart = ShoppingCart::where('cart_id', $id)->firstOrFail();
        $cart->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item di keranjang berhasil dihapus.'
        ], Response::HTTP_OK);
    }
}
