<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Discipline;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder{

    public function run(): void{

        $this->call([
            DisciplineSeeder::class,
            UserSeeder::class,
            CommunitySeeder::class,
            CommunityUserSeeder::class, // Add relationships after communities exist
            PassportSeeder::class,
        ]);
    }
}
