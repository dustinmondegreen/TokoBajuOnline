<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    private function generateCustomerID()
    {
        $prefix = 'CU';
        $lastCustomer = Customer::orderBy('customer_id', 'desc')->first();

        if (!$lastCustomer) {
            $nextNumber = 1;
        } else {
            $lastNumber = (int) substr($lastCustomer->customer_id, 2);
            $nextNumber = $lastNumber + 1;
        }

        return $prefix . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }
    public function register(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|unique:customers,customer_email',
            'customer_phone_number' => 'required|string|max:15|unique:customers,customer_phone_number',
            'password' => 'required|string|min:8',
        ]);

        $customer = Customer::create([
            'customer_id' => $this->generateCustomerID(), // ✅ pakai generate ID yang aman
            'customer_name' => $validated['customer_name'],
            'customer_age' => 0,
            'customer_email' => $validated['customer_email'],
            'customer_phone_number' => $validated['customer_phone_number'],
            'customer_address' => '',
            'password' => Hash::make($validated['password']),
        ]);
        

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'data' => $customer,
        ], Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'customer_email' => 'required|email',
            'password' => 'required|string',
        ]);

        $customer = Customer::where('customer_email', $validated['customer_email'])->first();

        if (!$customer || !Hash::check($validated['password'], $customer->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => $customer,
        ], Response::HTTP_OK);
    }
}
