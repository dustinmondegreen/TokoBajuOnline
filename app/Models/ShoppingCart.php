<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    use HasFactory;

    protected $table = 'shopping_carts'; // Nama tabel di database
    protected $primaryKey = 'cart_id'; // Primary key
    public $incrementing = false; // Tidak auto-increment
    protected $keyType = 'string'; // Tipe string

    protected $fillable = [
        'cart_id',
        'customer_id',
        'product_id',
    ];

    /**
     * Relasi ke Customer
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    /**
     * Relasi ke Product
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    /**
     * Generate Cart ID dengan format CART001
     */
    public static function generateCartId()
    {
        $lastCart = self::latest('cart_id')->first();

        if (!$lastCart) {
            return 'CART0001';
        }

        $lastNumber = (int) substr($lastCart->cart_id, 4);
        $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);

        return 'CART' . $newNumber;
    }


}
