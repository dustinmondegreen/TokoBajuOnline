<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Product</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold mb-6">Add New Product</h1>

        <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            @include('admin.products.partials.form')

            <div class="flex justify-between">
                <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                <a href="{{ route('admin.products.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</a>
            </div>
        </form>
    </div>
</body>
</html>
