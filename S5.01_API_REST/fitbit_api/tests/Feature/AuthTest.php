<?php

namespace Tests\Feature;

use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class AuthTest extends TestCase{
    
    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;

    protected function userAuthData(): array{
        return [
            'name' => 'Test User',
            'lastname' => 'User',
            'date_of_birth' => '2000-01-01',
            'email' => 'testuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'bank_acc' => '1234567890',
            'discipline_id' => null,
        ];
    }

    #[Test]
    public function a_user_can_register(): void{

        $response = $this->postJson('/api/v1/register', $this->userAuthData());
        $response->assertStatus(201);

        $expectedAuthUser = $this->userAuthData();
        unset(
            $expectedAuthUser['password'], 
            $expectedAuthUser['password_confirmation']
        );

        $this->assertDatabaseHas('users', $expectedAuthUser);
    }


    #[Test]
    public function user_can_login_with_correct_credentials(): void{
        $user = UserFactory::new()->create([
            'password' => bcrypt('password'),
        ]);
        $response = $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_at',
            'message',
            'user' => [
                'id',
                'name',
                'email',
                'role'
            ]
        ]);
    }

    #[Test]
    public function user_cannot_login_with_incorrect_credentials(): void{

        $user = UserFactory::new()->create();

        $response = $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401);
        $response->assertJson(['message' => 'The provided credentials are incorrect.']);
    }

    #[Test]
    public function authenticated_user_can_access_protected_route(): void{

        $user = $this->actingAsUser();

        $response = $this->getJson('/api/v1/users/' . $user->id);
        $response->assertStatus(200);

        $response->assertJsonPath('data.id', $user->id);
        $response->assertJsonPath('data.email', $user->email);
        $response->assertJsonPath('data.role', 'user');
    }

    #[Test]
    public function unauthenticated_user_cannot_access_protected_route(): void{
        $response = $this->getJson('/api/v1/users');
        $response->assertStatus(401);
    }
}

?>