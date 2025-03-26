<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OrderItemController extends Controller
{
    /**
     * Menampilkan semua item di dalam order tertentu.
     */
    public function index($orderId): JsonResponse
    {
        $orderItems = OrderItem::where('order_id', $orderId)->with('product')->get();
        return response()->json($orderItems);
    }

    /**
     * Menambahkan item baru ke dalam order.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'order_id' => 'required|exists:orders,order_id',
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $orderItem = OrderItem::create($request->all());
        return response()->json(['message' => 'Item berhasil ditambahkan', 'order_item' => $orderItem], 201);
    }

    /**
     * Menampilkan detail item tertentu di dalam order.
     */
    public function show($id): JsonResponse
    {
        $orderItem = OrderItem::with('product')->findOrFail($id);
        return response()->json($orderItem);
    }

    /**
     * Memperbarui jumlah atau harga item di dalam order.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'quantity' => 'integer|min:1',
            'price' => 'numeric|min:0',
        ]);

        $orderItem = OrderItem::findOrFail($id);
        $orderItem->update($request->only(['quantity', 'price']));

        return response()->json(['message' => 'Item berhasil diperbarui', 'order_item' => $orderItem]);
    }

    /**
     * Menghapus item dari order.
     */
    public function destroy($id): JsonResponse
    {
        $orderItem = OrderItem::findOrFail($id);
        $orderItem->delete();

        return response()->json(['message' => 'Item berhasil dihapus']);
    }
}
