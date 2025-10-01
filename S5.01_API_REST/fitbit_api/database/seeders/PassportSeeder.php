<?php

namespace Database\Seeders;

use Laravel\Passport\Client;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PassportSeeder extends Seeder{

    public function run(): void{
        try{
            $existingClient = Client::where('name', 'Laravel Personal Access Client')->first();
            
            if(!$existingClient){
                Client::create([
                    'name' => 'Laravel Personal Access Client',
                    'secret' => Str::random(40),
                    'redirect_uris' => ['http://localhost'],
                    'grant_types' => ['personal_access'],
                    'revoked' => false,
                ]);
            }            
        } catch(\Exception $e){
            // Personal Access Tokens will continue to work
        }
    }
}
