<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Customer extends Model
{
    use HasFactory;

    protected $primaryKey = 'customer_id';
    public $incrementing = false; // Non-increment karena custom ID
    protected $keyType = 'string'; // Primary key berupa string

    protected $fillable = [
        'customer_name',
        'customer_age',
        'customer_email',
        'customer_phone_number',
        'customer_address',
        'password',
    ];

    protected $hidden = ['password']; // Sembunyikan password dari response
}
