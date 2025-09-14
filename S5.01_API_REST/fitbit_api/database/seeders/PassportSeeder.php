<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Client;

class PassportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Delete in case there were previous records
        DB::table('oauth_clients')->delete();
        DB::table('oauth_personal_access_clients')->delete();

        //Run password and Personal Passport clients
        Artisan::call('app:create-passport-clients');

        //Insert Personal Access Client Id into personal_access_clients table
        $personalClientId = Client::where('grant_types', '["personal_access"]')->latest()->first('id');

        DB::table('oauth_personal_access_clients')->insert([
            'client_id' => $personalClientId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
