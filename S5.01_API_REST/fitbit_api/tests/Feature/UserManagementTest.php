<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Tests\Traits\ActingAsModeratorTest;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class UserManagementTest extends TestCase{

    
    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;
    use ActingAsModeratorTest;

    protected function setUp(): void{
        parent::setUp();
    }

    protected function userData(array $overrides = []): array{
        return array_merge([
            'name' => 'New User',
            'lastname' => 'User',
            'date_of_birth' => '2000-01-01',
            'email' => 'newuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'bank_acc' => '1234567890',
            'discipline_id' => null,
        ], $overrides);
    }

    #[Test]
    public function admin_can_create_user(): void{
        $this->actingAsAdmin();

        $response = $this->postJson('/api/v1/register', $this->userData());

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
            'name' => 'New User'
        ]);
    }

    #[Test]
    public function user_cannot_create_user(): void{
        $this->actingAsUser();

        $response = $this->postJson('/api/v1/users', $this->userData());

        $response->assertStatus(403);
        $this->assertDatabaseMissing('users', ['email' => 'newuser@example.com']);
    }

    #[Test]
    public function admin_can_update_user(): void{
        $this->actingAsAdmin();

        User::query()->delete();

        $user = UserFactory::new()->create([
            'name' => 'Original Name',
            'email' => 'original@example.com'
        ]);

        $uniqueData = $this->userData([
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'bank_acc' => '9876543210'
        ]);
        
        $response = $this->putJson('/api/v1/users/' . $user->id, $uniqueData);
        $response->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com'
        ]);
    }

    #[Test]
    public function user_cannot_update_user(): void{
        $this->actingAsUser();

        $user = UserFactory::new()->create();

        $response = $this->putJson('/api/v1/users/' . $user->id, $this->userData());
        $response->assertStatus(403);

        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }

    #[Test]
    public function admin_can_delete_a_user(): void{
        $this->actingAsAdmin();

        $userToDelete = UserFactory::new()->create();

        $response = $this->deleteJson("/api/v1/users/{$userToDelete->id}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing(
            'users',
            ['id' => $userToDelete->id]
        );
    }

    #[Test]
    public function user_cannot_delete_a_user(): void{
        $this->actingAsUser();

        $userToDelete = UserFactory::new()->create();

        $response = $this->deleteJson('/api/v1/users/' . $userToDelete->id);
        $response->assertStatus(403);

        $this->assertDatabaseHas('users', ['id' => $userToDelete->id]);
    }

    #[Test]
    public function moderator_can_temporarily_ban_user_with_admin_permission(): void {
        $this->actingAsAdmin();

        $moderator = $this->actingAsModerator();
        $userToBan = UserFactory::new()->create();

        $response = $this->postJson('/api/v1/users/' . $userToBan->id . '/ban', [
            'moderator_id' => $moderator->id,
            'reason' => 'Infracción de normas',
            'temporary' => true,
        ]);
        
        $response->assertStatus(404);
    }

    #[Test]
    public function moderator_cannot_permanently_delete_user(): void {
        $moderator = $this->actingAsModerator();
    
        $userToDelete = UserFactory::new()->create();

        $response = $this->deleteJson('/api/v1/users/' . $userToDelete->id, [
            'moderator_id' => $moderator->id
        ]);

        $response->assertStatus(403);
        
        $this->assertDatabaseHas('users', ['id' => $userToDelete->id]);
    }

}
?>
