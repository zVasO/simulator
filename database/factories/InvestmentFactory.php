<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Investment>
 */
class InvestmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $minAmount = $this->faker->numberBetween(0, 10000);
        $minRate = $this->faker->numberBetween(0, 100);

        return [
            'min_amount' => $minAmount,
            'max_amount' => $this->faker->numberBetween($minAmount, 100000),
            'min_rate' => $minRate,
            'max_rate' => $this->faker->numberBetween($minRate, 100),
        ];
    }
}
