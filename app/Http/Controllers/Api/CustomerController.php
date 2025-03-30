<?php

namespace App\Http\Controllers\Api;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    //auto generate customer id
    private function generateCustomerID()
    {
        $lastCustomer = Customer::orderBy('customer_id', 'desc')->first();
        if (!$lastCustomer) {
            return 'CU0001';
        }
        $lastNumber = (int) substr($lastCustomer->customer_id, 1);
        return 'CU' . str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();
        return response()->json(['success' => true, 'data' => $customers], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_age' => 'required|integer|min:0',
            'customer_email' => 'required|email|unique:customers,customer_email',
            'customer_phone_number' => 'required|string|max:15|unique:customers,customer_phone_number',
            'customer_address' => 'required|string',
            'password' => 'required|string|min:8', // Validasi password minimal 8 karakter
        ]);

        // Buat Customer baru
        $customer = Customer::create([
            'customer_id' => $this->generateCustomerID(),
            'customer_name' => $validated['customer_name'],
            'customer_age' => $validated['customer_age'],
            'customer_email' => $validated['customer_email'],
            'customer_phone_number' => $validated['customer_phone_number'],
            'customer_address' => $validated['customer_address'],
            'password' => Hash::make($validated['password']), // Hash password
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Customer added.',
            'data' => $customer
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return response()->json(['success' => true, 'data' => $customer], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_age' => 'required|integer|min:0',
            'customer_email' => 'required|email|unique:customers,customer_email,' . $customer->customer_id . ',customer_id',
            'customer_phone_number' => 'required|string|max:15|unique:customers,customer_phone_number,' . $customer->customer_id . ',customer_id',
            'customer_address' => 'required|string',
            'password' => 'nullable|string|min:8',
        ]);
        
        $data = array_filter($validated);
        if (isset($data['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }
        
        $customer->update($data);
        
        return response()->json([
            'success' => true,
            'message' => 'Customer updated.',
            'data' => $customer
        ], Response::HTTP_OK);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Customer deleted.'
        ], Response::HTTP_OK);
    }
}