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

        Community::create([
            'name' => 'The Way of the Do',
            'description' => 'Community of Karate enthusiasts',
            'discipline_id' => $disciplines->first()->id,
            'user_id' => $users->first()->id,
        ]);

        Community::create([
            'name' => 'Fitness Freaks',
            'description' => 'A community for fitness lovers',
            'discipline_id' => $disciplines->skip(1)->first()->id ?? $disciplines->first()->id,
            'user_id' => $users->skip(1)->first()->id ?? $users->first()->id,
        ]);

        Community::create([
            'name' => 'Yoga Enthusiasts',
            'description' => 'A community for yoga practitioners',
            'discipline_id' => $disciplines->skip(2)->first()->id ?? $disciplines->first()->id,
            'user_id' => $users->first()->id,
        ]);
    }
}
