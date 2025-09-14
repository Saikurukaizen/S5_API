<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\PersonalAccessClientFactory;

class CreatePassportClients extends Command
{
    protected $signature = 'app:create-passport-clients';
    protected $description = 'Create Passport Personal and Password Grant Clients';

    public function handle(){

        $clientRepo = app(ClientRepository::class);
        $personalAccessClientFactory = app(PersonalAccessClientFactory::class);

        // Crear Personal Access Client
        $personalClient = $personalAccessClientFactory->make(
            'Personal Access Client',
            config('app.url')
        );
        $this->info("Personal Access Client created:");
        $this->info("Client ID: " . $personalClient->id);
        $this->info("Client Secret: " . ($personalClient->plainSecret ?? 'No disponible'));

        // Crear Password Grant Client
        $passwordClient = $clientRepo->createPasswordGrantClient(
            null, // user_id
            'Password Grant Client',
            config('app.url'), // redirect
            false // confidential
        );
        $this->info("Password Grant Client created:");
        $this->info("Client ID: " . $passwordClient->id);
        $this->info("Client Secret: " . $passwordClient->secret);

        return 0;
    }
}

