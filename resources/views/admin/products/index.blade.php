<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product List</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold mb-6">Product List</h1>

        @if(session('success'))
            <div class="bg-green-100 text-green-700 p-3 mb-4 rounded">
                {{ session('success') }}
            </div>
        @endif

        <a href="{{ route('admin.products.create') }}" class="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block">Add Product</a>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Image</th>
                        <th class="py-2 px-4 border-b">Name</th>
                        <th class="py-2 px-4 border-b">Category</th>
                        <th class="py-2 px-4 border-b">Price</th>
                        <th class="py-2 px-4 border-b">Stock</th>
                        <th class="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($products as $product)
                    <tr class="text-center">
                        <td class="py-2 px-4 border-b">
                            @if($product->image)
                                <img src="{{ asset($product->image) }}" class="h-16 mx-auto rounded">
                            @else
                                No Image
                            @endif
                        </td>
                        <td class="py-2 px-4 border-b">{{ $product->product_name }}</td>
                        <td class="py-2 px-4 border-b">{{ $product->category }}</td>
                        <td class="py-2 px-4 border-b">Rp {{ number_format($product->price, 0, ',', '.') }}</td>
                        <td class="py-2 px-4 border-b">{{ $product->quantity }}</td>
                        <td class="py-2 px-4 border-b">
                            <a href="{{ route('admin.products.edit', $product->product_id) }}" class="bg-yellow-400 text-white px-2 py-1 rounded">Edit</a>
                            <form action="{{ route('admin.products.destroy', $product->product_id) }}" method="POST" class="inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded" onclick="return confirm('Are you sure?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
