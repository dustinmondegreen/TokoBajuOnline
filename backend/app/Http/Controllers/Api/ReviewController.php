<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with(['customer', 'product'])->get();
        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required|exists:customers,customer_id',
            'product_id' => 'required|exists:products,product_id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $review = Review::create([
            'review_id' => Review::generateReviewId(),
            'customer_id' => $request->customer_id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'review' => $request->review,
            'review_date' => now(),
        ]);

        return response()->json([
            'message' => 'Review added successfully',
            'review' => $review,
        ], 201);
    }

    public function show($review_id)
    {
        $review = Review::with(['customer', 'product'])->where('review_id', $review_id)->first();

        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        return response()->json($review);
    }

    public function getByProduct($product_id)
    {
        $reviews = Review::where('product_id', $product_id)->get();
        return response()->json($reviews);
    }

}


