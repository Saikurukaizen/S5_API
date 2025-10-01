<?php

namespace Database\Seeders;

use App\Models\Discipline;
use Illuminate\Database\Seeder;

class DisciplineSeeder extends Seeder{

    public function run(): void{
        $karateExists = Discipline::where('name', 'Karate')->exists();
        
        if (!$karateExists) {
            Discipline::create([
                'name' => 'Karate',
                'description' => 'Arte marcial japonés'
            ]);
            echo "V- Discipline 'Karate' created\n";
        } else {
            echo "V- Discipline 'Karate' already exists\n";
        }

        $currentCount = Discipline::count();
        if ($currentCount < 6) {
            $needed = 6 - $currentCount;
            Discipline::factory()->count($needed)->create();
            echo "V- {$needed} disciplines created additionally\n";
        }

        echo "V- Total disciplines: " . Discipline::count() . "\n";
    }
}
