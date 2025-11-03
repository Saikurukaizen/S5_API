<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Community;
use App\Models\Discipline;
use App\Models\User;

class CommunitySeeder extends Seeder{

    public function run(): void{
        // Get existing disciplines and users
        $disciplines = Discipline::all();
        $users = User::all();
        
        if ($disciplines->isEmpty() || $users->isEmpty()) {
            $this->command->error('No disciplines or users found. Please run DisciplineSeeder and UserSeeder first.');
            return;
        }

        // Create communities with fixed discipline_id relationships
        Community::create([
            'name' => 'The Way of the Do',
            'description' => 'Community of Karate enthusiasts dedicated to the martial arts way',
            'discipline_id' => 1, // Karate discipline
            'user_id' => $users->first()->id,
        ]);

        Community::create([
            'name' => 'Fitness Freaks',
            'description' => 'High-intensity community for fitness and strength training lovers',
            'discipline_id' => 2, // Second discipline
            'user_id' => $users->skip(1)->first()?->id ?? $users->first()->id,
        ]);

        Community::create([
            'name' => 'Yoga Enthusiasts',
            'description' => 'Peaceful community for yoga practitioners seeking balance and mindfulness',
            'discipline_id' => 3, // Third discipline
            'user_id' => $users->first()->id,
        ]);
    }
}
