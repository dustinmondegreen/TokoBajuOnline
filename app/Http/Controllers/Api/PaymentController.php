<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Buat pembayaran baru
     */
    public function store(Request $request)
    {
        // Validasi request
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,order_id',
            'payment_method' => 'required|in:e_wallet,virtual_account,bank',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Ambil total amount dari order terkait
        $order = Order::where('order_id', $request->order_id)->firstOrFail();

        // Pastikan metode `generatePaymentId` ada di model Payment
        if (!method_exists(Payment::class, 'generatePaymentId')) {
            return response()->json(['error' => 'Method generatePaymentId() is missing in Payment model'], 500);
        }

        // Buat pembayaran
        $payment = Payment::create([
            'payment_id' => Payment::generatePaymentId(),
            'order_id' => $request->order_id,
            'payment_method' => $request->payment_method,
            'payment_status' => 'Pending', // Default status
            'payment_date' => now(),
        ]);

        return response()->json([
            'message' => 'Payment created successfully',
            'payment' => $payment->load('order'), // Menggunakan load untuk menampilkan order terkait
        ], 201);
    }

    /**
     * Tampilkan semua pembayaran berdasarkan order_id
     */
    public function show($order_id)
    {
        $payments = Payment::with('order')->where('order_id', $order_id)->get();
        
        if ($payments->isEmpty()) {
            return response()->json(['error' => 'No payments found for this order'], 404);
        }

        return response()->json([
            'payments' => $payments,
        ]);
    }
}
