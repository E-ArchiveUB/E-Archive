<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin Satu',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
        ]);
    }
}
