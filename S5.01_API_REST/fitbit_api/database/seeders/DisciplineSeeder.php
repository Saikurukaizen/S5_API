<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DisciplineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        DB::table('disciplines')->insert([
            [
                'name' => 'Tai-Chi',
                'description' => 'Arte Marcial Chino'
            ],
            [
                'name' => 'Boxeo',
                'description' => 'Estilo de combate americano'
            ],
            [
                'name' => 'Bodybuilder',
                'description' => 'Disciplina de musculación'
            ]
        ]);
    }
}
