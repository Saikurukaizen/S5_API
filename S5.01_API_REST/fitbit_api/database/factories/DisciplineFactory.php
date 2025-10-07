<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class DisciplineFactory extends Factory{

    public function definition(): array{
        return [
            'name' => $this->faker->unique()->words(2, true) . ' ' . $this->faker->randomNumber(4),
            'description' => $this->faker->sentence(),
        ];
    }
}
