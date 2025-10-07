<?php

namespace Database\Factories;

use App\Models\Discipline;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommunityFactory extends Factory{

    public function definition(): array{
        return [
            'name' => $this->faker->unique()->word(),
            'description' => $this->faker->sentence(),
            'discipline_id' => Discipline::factory(),
            'user_id' => User::factory(),
        ];
    }
}
