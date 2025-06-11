<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Order extends Model
{
    use HasFactory;

    protected $table = 'orders'; // Nama tabel di database

    protected $primaryKey = 'order_id'; // Primary Key

    public $incrementing = false; // Karena primary key bukan auto-increment

    protected $keyType = 'string'; // Primary Key berupa string

    protected $fillable = [
        'order_id',
        'customer_id',
        'order_date',
        'order_status',
        'total_amount',
        'shipping_address',
        'delivery_date',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    /**
     * Relasi ke Payment (One-to-One: Order memiliki 1 Payment)
     */
    public function payment()
    {
        return $this->hasOne(Payment::class, 'order_id', 'order_id');
    }

    /**
     * Relasi ke OrderItem (One-to-Many: Order memiliki banyak OrderItem)
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'order_id');
    }


    /**
     * Generate Order ID dengan format O0001
     */
    public static function generateOrderId()
    {
        $lastOrder = self::latest('order_id')->first();

        if (!$lastOrder) {
            return 'O0001';
        }

        $lastNumber = (int) substr($lastOrder->order_id, 1);
        $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);

        return 'O' . $newNumber;
    }


}


