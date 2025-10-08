<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserFactory extends Factory{
 
    protected $model = User::class;

    protected static ?string $password;

    public function modelName(): string{
        return User::class;
    }

    public function definition(): array{
        return [
            'name' => fake()->name(),
            'lastname' => fake()->lastName(),
            'date_of_birth' => fake()->date(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'bank_acc' => fake()->bankAccountNumber(),
            'discipline_id' => null,
            'role' => 'user',
        ];
    }

    public function unverified(): static{
        return $this->state(fn () => [
            'email_verified_at' => null,
        ]);
    }

    public function admin(): static{
        return $this->state(fn () => [
            'role' => 'admin',
        ]);
    }

    public function moderator(): static{
        return $this->state(fn () => [
            'role' => 'moderator',
        ]);
    }
}
