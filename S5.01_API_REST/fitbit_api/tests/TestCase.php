<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Traits\ActingAsUserTest;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsModeratorTest;
use Laravel\Passport\Client;

abstract class TestCase extends BaseTestCase
{
    use ActingAsUserTest,
        ActingAsAdminTest,
        ActingAsModeratorTest;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Crear el personal access client si no existe
        if (!Client::whereJsonContains('grant_types', 'personal_access')->exists()) {
            Client::create([
                'name' => 'Laravel Personal Access Client',
                'secret' => null,
                'provider' => 'users',
                'redirect_uris' => [],
                'grant_types' => ['personal_access'],
                'create_access_client' => 0,
                'revoked' => 0,
            ]);
        }
    }
}
