<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'reviews';
    protected $primaryKey = 'review_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'review_id',
        'customer_id',
        'product_id',
        'rating',
        'review',
        'review_date'
    ];

    public static function generateReviewId()
    {
        $latest = self::latest('review_id')->first();
        $lastNumber = $latest ? (int)substr($latest->review_id, 3) : 0;
        return 'REV' . str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
