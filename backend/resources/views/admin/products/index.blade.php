<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Product List</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/feather-icons"></script>
</head>
<body class="bg-[#E7F3FF] min-h-screen mt-16 p-6">
    <div class="max-w-7xl mx-auto bg-white p-12 rounded-xl shadow-sm">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-semibold text-gray-800">Product List</h1>
            <a href="{{ route('admin.products.create') }}" class="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700">Add Product</a>
        </div>

        @if(session('success'))
            <div class="bg-green-100 text-green-800 px-4 py-3 rounded mb-4 border border-green-200">
                {{ session('success') }}
            </div>
        @endif

        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-[#F2F7FB]">
                    <tr>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-tl-xl">Image</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-tr-xl">Action</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-100">
                    @foreach($products as $product)
                    <tr class="odd:bg-[#FAFBFD] even:bg-white">
                        <td class="px-6 py-4">
                            @if($product->image)
                                <img src="{{ asset($product->image) }}" class="h-12 w-12 object-cover rounded" />
                            @else
                                <span class="text-gray-400 italic">No Image</span>
                            @endif
                        </td>
                        <td class="px-6 py-4">{{ $product->product_name }}</td>
                        <td class="px-6 py-4">{{ $product->category }}</td>
                        <td class="px-6 py-4">Rp {{ number_format($product->price, 0, ',', '.') }}</td>
                        <td class="px-6 py-4">{{ $product->quantity }}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <a href="{{ route('admin.products.edit', $product->product_id) }}" 
                                   class="text-yellow-500 hover:text-yellow-600 p-2 rounded-full hover:bg-yellow-100" 
                                   title="Edit">
                                    <i data-feather="edit" class="w-6 h-6"></i>
                                </a>
                                <form action="{{ route('admin.products.destroy', $product->product_id) }}" method="POST" onsubmit="return confirm('Are you sure?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" 
                                            class="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100" 
                                            title="Delete">
                                        <i data-feather="trash-2" class="w-6 h-6"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <script>
        feather.replace()
    </script>
</body>
</html>
