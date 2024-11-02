<?php

namespace Database\Seeders;

use App\Models\Investment;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Investment::factory()->create([
            'min_amount' => 6100,
            'max_amount' => 10370,
            'min_rate' => 0,
            'max_rate' => 8,
        ]);
    }
}
