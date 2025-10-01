<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class DisciplineFactory extends Factory{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array{
        return [
            'name' => $this->faker->unique()->words(2, true) . ' ' . $this->faker->randomNumber(4),
            'description' => $this->faker->sentence(),
        ];
    }
}
