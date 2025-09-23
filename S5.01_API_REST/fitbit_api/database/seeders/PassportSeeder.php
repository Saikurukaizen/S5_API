<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class PassportSeeder extends Seeder
{

    public function run(): void
    {
      Artisan::call('app:create-passport-clients');
    }
}
