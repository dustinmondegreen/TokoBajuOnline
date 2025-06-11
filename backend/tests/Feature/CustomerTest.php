<?php

namespace Tests\Feature; // HARUS sesuai dengan folder

use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_creation()
    {
        $response = $this->postJson('/api/customers', [
            'customer_id' => $customerId, // Tambahkan customer_id
            'customer_name' => 'Jane Doe',
            'customer_age' => 28,
            'customer_email' => 'janedoe@example.com',
            'customer_phone_number' => '081298765432',
            'customer_address' => '456 Elm St',
            'password' => 'password123',
        ]);

        $response->assertStatus(201)
                 ->assertJson(['success' => true]);

        $this->assertDatabaseHas('customers', [
            'customer_email' => 'janedoe@example.com',
        ]);
    }
}
