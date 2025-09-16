<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Laravel\Passport\Client;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PassportManagementTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_creates_personal_and_password_clients(): void{
        Artisan::call('app:create-passport-clients');

        $this->assertDatabaseHas('oauth_clients', [
            'name' => 'Personal Access Client',
        ]);

        $this->assertDatabaseHas('oauth_clients', [
            'name' => 'Password Grant Client',
        ]);
    }

    #[Test]
    public function it_registers_personal_access_client_in_personal_table(): void{

        Artisan::call('app:create-passport-clients');

        $personalClient = Client::where('name', 'Personal Access Client')->first();

        $this->assertDatabaseHas('oauth_personal_access_clients', [
            'client_id' => $personalClient->id,
        ]);
    }

    #[Test]
    public function it_the_command_twice_does_not_duplicate_clients(): void{
        
        Artisan::call('app:create-passport-clients');
        Artisan::call('app:create-passport-clients');

        $this->assertEquals(1, Client::where('name', 'Personal Access Client')->count());
        $this->assertEquals(1, Client::where('name', 'Password Grant Client')->count());
    }
}
