<?php

namespace Tests\Feature;

use App\Models\User;
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
        $user = User::factory()->create([
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
            'expires_in',
            'refresh_token',
        ]);
    }

    #[Test]
    public function user_cannot_login_with_incorrect_credentials(): void{

        $user = User::factory()->create();

        $response = $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthorized']);
    }

    #[Test]
    public function authenticated_user_can_access_protected_route(): void{

        $user = $this->actingAsUser();
        $response = $this->getJson('/api/v1/users/' . $user->id);
        $response->assertStatus(200);
+
        $expectedAuthUser = $this->userAuthData();
        unset(
            $expectedAuthUser['password'],
            $expectedAuthUser['password_confirmation']
        );

        $response->assertJsonFragment($expectedAuthUser + [
            'id' => $user->id,
            'role' => 'user',
            'discipline_id' => null,
            'created_at' => $user->created_at->toJSON(),
            'updated_at' => $user->updated_at->toJSON(),
        ]);
    }

    #[Test]
    public function unauthenticated_user_cannot_access_protected_route(): void{

        $response = $this->getJson('/api/v1/users/1');
        $response->assertStatus(401);
    }

    #[Test]
    public function admin_can_logout(): void{
        
        $this->actingAsAdmin();

        $response = $this->postJson('/api/v1/logout');
        $response->assertStatus(200);
        $response->assertJson(['message' => 'Successfully logged out']);
        
        $response = $this->getJson('/api/v1/users');
        $response->assertStatus(401);
    }

    #[Test]
    public function user_can_logout(): void{

        $user = $this->actingAsUser();

        $response = $this->postJson('/api/v1/logout');
        $response->assertStatus(200);
        $response->assertJson(['message' => 'Successfully logged out']);

        $response = $this->getJson('/api/v1/users/' . $user->id);
        $response->assertStatus(401);
    }

    #[Test]
    public function it_can_refresh_token(): void{
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        $loginResponse = $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $refreshToken = $loginResponse->json('refresh_token');
        $response = $this->postJson('/api/v1/refresh-token', [
            'refresh_token' => $refreshToken,
        ]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in',
            'refresh_token',
        ]);
    }
}
?>