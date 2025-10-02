<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Community;
use App\Models\Discipline;
use App\Models\User;

class CommunitySeeder extends Seeder{

    public function run(): void{
        Community::create([
            'name' => 'The Way of the Do',
            'description' => 'Community of Karate enthusiasts',
            'discipline_id' => Discipline::factory(),
            'user_id' => User::factory(),
        ]);

        Community::create([
            'name' => 'Fitness Freaks',
            'description' => 'A community for fitness lovers',
            'discipline_id' => Discipline::factory(),
            'user_id' => User::factory(),
        ]);

        Community::create([
            'name' => 'Yoga Enthusiasts',
            'description' => 'A community for yoga practitioners',
            'discipline_id' => Discipline::factory(),
            'user_id' => User::factory(),
        ]);
    }
}
