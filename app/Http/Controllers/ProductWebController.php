<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductWebController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'product_name');
        $direction = $request->get('direction', 'asc');

        $allowedSorts = ['product_name', 'category', 'price', 'quantity'];

        if (!in_array($sort, $allowedSorts)) {
            $sort = 'product_name';
        }
        if (!in_array($direction, ['asc', 'desc'])) {
            $direction = 'asc';
        }

        $products = Product::orderBy($sort, $direction)->get();

        return view('admin.products.index', compact('products', 'sort', 'direction'));
    }




    public function create()
    {
        return view('admin.products.create');
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

            // Cari product terakhir berdasarkan product_id terbesar
        $lastProduct = Product::orderBy('product_id', 'desc')->first();

        if (!$lastProduct) {
            $nextNumber = 1;
        } else {
            $lastNumber = (int) substr($lastProduct->product_id, 1); // ambil angka
            $nextNumber = $lastNumber + 1;
        }

        $validated['product_id'] = 'P' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($path);
        }

        Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product successfully created.');
    }

    public function edit($product_id)
    {
        $product = Product::where('product_id', $product_id)->firstOrFail();
        return view('admin.products.edit', compact('product'));
    }

    public function update(Request $request, $product_id)
    {
        $product = Product::where('product_id', $product_id)->firstOrFail();

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
            if ($product->image) {
                $imagePath = str_replace('/storage/', '', $product->image);
                Storage::disk('public')->delete($imagePath);
            }
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($path);
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product successfully updated.');
    }

    public function destroy($product_id)
    {
        $product = Product::where('product_id', $product_id)->firstOrFail();

        if ($product->image) {
            $imagePath = str_replace('/storage/', '', $product->image);
            Storage::disk('public')->delete($imagePath);
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product successfully deleted.');
    }

}
