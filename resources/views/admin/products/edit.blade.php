<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Edit Product</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-10 flex justify-center items-start">

    <div class="bg-white max-w-xl w-full rounded-xl shadow-2xl p-8">
        <h1 class="text-3xl font-extrabold text-indigo-800 mb-8 text-center drop-shadow-md">Edit Product</h1>

        <form action="{{ route('admin.products.update', $product->product_id) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf
            @method('PUT')

            @include('admin.products.partials.form', ['product' => $product])

            <div class="flex justify-between">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105">
                    Update
                </button>
                <a href="{{ route('admin.products.index') }}" 
                   class="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
                    Cancel
                </a>
            </div>
        </form>
    </div>

</body>
</html>
