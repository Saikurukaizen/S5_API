<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Client;
class CreatePassportClients extends Command
{
    protected $signature = 'app:create-passport-clients';
    protected $description = 'Create Passport Personal and Password Grant Clients';

    public function handle(): int{
         
        DB::table('oauth_clients')->delete();
        if(DB::getSchemaBuilder()->hasTable('oauth_personal_access_clients')){
            DB::table('oauth_personal_access_clients')->delete();
        }

        Artisan::call('passport:client', [
            '--personal' => true,
            '--name' => 'Personal Access Client',
        ]);

        Artisan::call('passport:client', [
            '--password' => true,
            '--name' => 'Password Grant Client',
        ]);

        $this->info("Personal and Password Grant Clients created successfully.");

        $personalClient = Client::where('grant_types', '["personal_access"]')->latest()->first();

        if($personalClient && DB::schemaBuilder()->hasTable('oauth_personal_access_clients')){
            DB::table('oauth_personal_access_clients')->insert([
                'client_id' => $personalClient->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->info("Personal Access Client ID stored in oauth_personal_access_clients table.");
        }

        return Command::SUCCESS;
    }
}
