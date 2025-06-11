<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    // Menampilkan semua order
    public function index()
    {
        $orders = Order::with(['customer', 'items.product'])->get();
        
        return response()->json($orders);
    }

    // Membuat order dari shopping cart
    public function checkout(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,customer_id',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,product_id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            $customer = Customer::where('customer_id', $request->customer_id)->first();

            // Hitung total amount
            $totalAmount = 0;
            foreach ($request->items as $item) {
                $product = Product::where('product_id', $item['product_id'])->first();
                $totalAmount += $product->price * $item['quantity'];
            }

            // Buat Order
            $order = Order::create([
                'order_id' => 'ORD' . time(),
                'customer_id' => $customer->customer_id,
                'order_date' => now(),
                'delivery_date' => now()->addDays(7),
                'shipping_address' => $request->shipping_address,
                'order_status' => 'Pending',
                'total_amount' => $totalAmount,
            ]);

            // Tambahkan item ke OrderItem
            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->order_id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => Product::where('product_id', $item['product_id'])->value('price'),
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Menampilkan detail order
    public function show($order_id)
    {
        $order = Order::with(['customer', 'items.product'])->where('order_id', $order_id)->firstOrFail();
        return response()->json($order);
    }

    // Mengubah status order
    public function updateStatus(Request $request, $id)
    {
        $request->validate(['order_status' => 'required|in:Pending,Selesai']);
        $order = Order::findOrFail($id);
        $order->update(['order_status' => $request->order_status]);

        return response()->json(['message' => 'Order status updated', 'order' => $order]);
    }

    // Menghapus order
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
