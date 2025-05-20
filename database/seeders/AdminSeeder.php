<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!Admin::where('role', 'admin')->exists()) {
            Admin::create([
                'name' => 'Super Admin',
                'email' => 'admin@email.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]);
        }

    }
}
