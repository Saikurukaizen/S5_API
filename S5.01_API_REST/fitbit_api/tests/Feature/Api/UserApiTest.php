<?php

namespace Tests\Feature\Api;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class UserApiTest extends TestCase{

    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;

    #[Test]
    public function admin_can_create_a_user_in_api(): void{
        User::query()->delete();
        
        $this->actingAsAdmin();

        $response = $this->postJson('/api/v1/users', [
            'name' => 'Test',
            'lastname' => 'User',
            'email' => 'testuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'date_of_birth' => '1990-01-01',
            'bank_acc' => '1234567890',
        ]);

        $response->assertStatus(201);
    }

    #[Test]
    public function user_cannot_create_a_user_in_api(): void{
        $this->actingAsUser();

        $response = $this->postJson('/api/v1/users', [
            'name' => 'Test',
            'lastname' => 'User',
            'email' => 'testuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'date_of_birth' => '1990-01-01',
            'bank_acc' => '1234567890',
        ]);

        $response->assertStatus(403);
    }

    #[Test]
    public function admin_can_view_all_users_in_api(): void{
        $this->actingAsAdmin();

        $response = $this->getJson('/api/v1/users');

        $response->assertStatus(200);
    }

    #[Test]
    public function user_cannot_view_all_users_in_api(): void{
        $this->actingAsUser();

        $response = $this->getJson('/api/v1/users');

        $response->assertStatus(403);
    }

    #[Test]
    public function admin_can_update_a_user_in_api(): void{
        $this->actingAsAdmin();

        $userToUpdate = UserFactory::new()->create();

        $response = $this->putJson('/api/v1/users/' . $userToUpdate->id, [
            'name' => 'Updated',
            'lastname' => 'Name',
            'email' => 'updatedemail@example.com',
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
            'date_of_birth' => '1990-01-01',
            'bank_acc' => '0987654321',
        ]);

        $response->assertStatus(200);
    }

    #[Test]
    public function user_cannot_update_a_user_in_api(): void{
        $this->actingAsUser();

        $otherUser = UserFactory::new()->create();

        $response = $this->putJson('/api/v1/users/' . $otherUser->id, [
            'name' => 'Updated',
            'lastname' => 'Name',
            'email' => 'updatedemail@example.com',
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
            'date_of_birth' => '1990-01-01',
            'bank_acc' => '0987654321',
        ]);

        $response->assertStatus(403);
    }

    #[Test]
    public function admin_can_delete_a_user_in_api(): void{
        $this->actingAsAdmin();

        $userToDelete = UserFactory::new()->create();

        $response = $this->deleteJson('/api/v1/users/' . $userToDelete->id);

        $response->assertStatus(200);
    }

    #[Test]
    public function user_cannot_delete_a_user_in_api(): void{
        $this->actingAsUser();
        
        $userToDelete = UserFactory::new()->create();

        $response = $this->deleteJson('/api/v1/users/' . $userToDelete->id);

        $response->assertStatus(403);
    }
}
?>