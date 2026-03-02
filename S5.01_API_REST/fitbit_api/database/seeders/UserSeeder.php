<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder{

    public function run(): void{
        // Verificar que existe al menos una disciplina para el usuario normal
        $firstDiscipline = \App\Models\Discipline::first();
        $disciplines = \App\Models\Discipline::all();
        
        // Crear usuario predeterminado
        $user = UserFactory::new()->create([
            'name' => 'Doom',
            'lastname' => 'Eternal',
            'date_of_birth' => '1999-06-06',
            'email' => 'doom@user.com',
            'email_verified_at' => now(),
            'password' => bcrypt('666'),
            'remember_token' => Str::random(10),
            'bank_acc' => '666666666D',
            'discipline_id' => $firstDiscipline ? $firstDiscipline->id : null,
            'role' => 'user',
        ]);

        // Crear admin predeterminado
        $admin = UserFactory::new()->create([
            'name' => 'Lux',
            'lastname' => 'Triumfantis',
            'date_of_birth' => '2000-01-01',
            'email' => 'lux@admin.com',
            'email_verified_at' => now(),
            'password' => bcrypt('8000'),
            'remember_token' => Str::random(10),
            'bank_acc' => '1234567890',
            'discipline_id' => null, // Admin no necesita disciplina
            'role' => 'admin',
        ]);

        // Crear 8 usuarios aleatorios adicionales
        for ($i = 0; $i < 8; $i++) {
            $randomDiscipline = $disciplines->isNotEmpty() ? $disciplines->random() : null;
            
            UserFactory::new()->create([
                'name' => fake()->firstName(),
                'lastname' => fake()->lastName(),
                'date_of_birth' => fake()->date('Y-m-d', '2005-01-01'),
                'email' => fake()->unique()->safeEmail(),
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'remember_token' => Str::random(10),
                'bank_acc' => fake()->numerify('##########'),
                'discipline_id' => $randomDiscipline ? $randomDiscipline->id : null,
                'role' => 'user',
            ]);
        }
    }
}