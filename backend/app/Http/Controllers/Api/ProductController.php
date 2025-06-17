<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json(['success' => true, 'data' => $products], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'material' => 'required|string|max:255',
            'color' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

                    // Cari product terakhir berdasarkan product_id (urut terbesar)
            $lastProduct = Product::orderBy('product_id', 'desc')->first();

            if (!$lastProduct) {
                $nextNumber = 1;
            } else {
                // Ambil angka dari product_id, misal dari "P0007" -> 7
                $lastNumber = (int) substr($lastProduct->product_id, 1);
                $nextNumber = $lastNumber + 1;
            }

        // Generate ID baru
        $validated['product_id'] = 'P' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($path); // simpan path public ke DB
        }

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product successfully created.',
            'data' => $product
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json(['success' => true, 'data' => $product], Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'product_name' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'quantity' => 'sometimes|required|integer|min:0',
            'material' => 'sometimes|required|string|max:255',
            'color' => 'sometimes|required|string|max:50',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($path);
        }

        $product->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product successfully updated.',
            'data' => $product
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Hapus file image dari storage juga
        if ($product->image) {
            $imagePath = str_replace('/storage/', '', $product->image);
            Storage::disk('public')->delete($imagePath);
        }

        $product->delete();

        return response()->json(['success' => true, 'message' => 'Product successfully deleted.'], Response::HTTP_OK);
    }
}
