<?php

namespace Database\Seeders;

use App\Models\Discipline;
use Illuminate\Database\Seeder;

class DisciplineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{

        Discipline::create([
            'name' => 'Karate',
            'description' => 'Japanese martial art'
        ]);

        Discipline::factory()->count(5)->create();

    }
}
