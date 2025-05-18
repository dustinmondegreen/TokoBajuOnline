<div class="space-y-5">
    <div>
        <label class="block mb-2 font-semibold text-indigo-700 text-lg">Product Name</label>
        <input type="text" name="product_name" value="{{ old('product_name', $product->product_name ?? '') }}" 
            class="w-full border border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
    </div>

    <div>
        <label class="block mb-2 font-semibold text-indigo-700 text-lg">Category</label>
        <input type="text" name="category" value="{{ old('category', $product->category ?? '') }}" 
            class="w-full border border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
    </div>

    <div>
        <label class="block mb-2 font-semibold text-indigo-700 text-lg">Price</label>
        <input type="number" step="0.01" name="price" value="{{ old('price', $product->price ?? '') }}" 
            class="w-full border border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
    </div>

    <div>
        <label class="block mb-2 font-semibold text-indigo-700 text-lg">Quantity</label>
        <input type="number" name="quantity" value="{{ old('quantity', $product->quantity ?? '') }}" 
            class="w-full border border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
    </div>

    <div>
        <label class="block mb-2 font-semibold text-indigo-700 text-lg">Material</label>
        <input type="text" name="material" value="{{ old('material', $product->material ?? '') }}" 
            class="w-full border border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
    </div>

    <div>
        <label class="block mb-2 font-semibold text-indigo-700 text-lg">Color</label>
        <input type="text" name="color" value="{{ old('color', $product->color ?? '') }}" 
            class="w-full border border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
    </div>

    <div>
        <label class="block mb-3 font-semibold text-indigo-700 text-lg">Image</label>
        @if(!empty($product->image))
            <img src="{{ asset($product->image) }}" alt="Current Image" class="h-28 w-auto rounded-xl shadow-md mb-3 object-contain">
        @endif
        <input type="file" name="image" class="w-full border border-indigo-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1">
    </div>
</div>
