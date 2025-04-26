<div class="mb-4">
    <label class="block mb-1 font-bold">Product Name</label>
    <input type="text" name="product_name" value="{{ old('product_name', $product->product_name ?? '') }}" class="w-full border p-2 rounded" required>
</div>

<div class="mb-4">
    <label class="block mb-1 font-bold">Category</label>
    <input type="text" name="category" value="{{ old('category', $product->category ?? '') }}" class="w-full border p-2 rounded" required>
</div>

<div class="mb-4">
    <label class="block mb-1 font-bold">Price</label>
    <input type="number" step="0.01" name="price" value="{{ old('price', $product->price ?? '') }}" class="w-full border p-2 rounded" required>
</div>

<div class="mb-4">
    <label class="block mb-1 font-bold">Quantity</label>
    <input type="number" name="quantity" value="{{ old('quantity', $product->quantity ?? '') }}" class="w-full border p-2 rounded" required>
</div>

<div class="mb-4">
    <label class="block mb-1 font-bold">Material</label>
    <input type="text" name="material" value="{{ old('material', $product->material ?? '') }}" class="w-full border p-2 rounded" required>
</div>

<div class="mb-4">
    <label class="block mb-1 font-bold">Color</label>
    <input type="text" name="color" value="{{ old('color', $product->color ?? '') }}" class="w-full border p-2 rounded" required>
</div>

<div class="mb-6">
    <label class="block mb-1 font-bold">Image</label>
    @if(!empty($product->image))
        <img src="{{ asset($product->image) }}" class="h-24 mb-2 rounded">
    @endif
    <input type="file" name="image" class="w-full border p-2 rounded mt-2">
</div>
