<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments'; // Nama tabel di database
    protected $primaryKey = 'payment_id'; // Primary Key

    public $incrementing = false; // Karena primary key bukan auto-increment
    protected $keyType = 'string'; // Primary Key berupa string

    protected $fillable = [
        'payment_id',
        'order_id',
        'payment_method',
        'payment_status',
        'payment_date',
    ];

    /**
     * Relasi ke Order (One-to-One: Payment terkait dengan satu Order)
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }

    /**
     * Generate Payment ID dengan format PAY0001
     */
    public static function generatePaymentId()
    {
        $lastPayment = self::latest('payment_id')->first();

        if (!$lastPayment) {
            return 'PAY0001';
        }

        $lastNumber = (int) substr($lastPayment->payment_id, 3);
        $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);

        return 'PAY' . $newNumber;
    }
}