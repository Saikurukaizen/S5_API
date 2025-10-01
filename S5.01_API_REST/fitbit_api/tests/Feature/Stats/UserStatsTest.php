<?php

namespace Tests\Feature\Stats;

use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Tests\Traits\ActingAsModeratorTest;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserStatsTest extends TestCase{

    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;
    use ActingAsModeratorTest;

    #[Test]
    public function it_cannot_access_if_not_authenticated(): void{
        $response = $this->getJson('/api/v1/stats/users');
        $response->assertStatus(403);
    }

    #[Test]
    public function it_cannot_access_users_stats_when_not_admin(): void{
        $this->ActingAsUser();

        $response = $this->getJson('/api/v1/stats/users');
        $response->assertStatus(403);
    }

    #[Test]
    public function it_returns_zero_when_no_users_exist(): void{
        $this->ActingAsAdmin();

        $response = $this->getJson('/api/v1/stats/users');
        $response->assertStatus(200)->assertJsonFragment([
            'total_users' => 0,
        ]);
    }

    #[Test]
    public function it_returns_total_number_of_users(): void{
        UserFactory::new()->count(5)->create();
        $this->ActingAsAdmin();

        $response = $this->getJson('/api/v1/stats/users');
        $response->assertStatus(200)->assertJsonFragment([
            'total_users' => 5,
        ]);
    }

    #[Test]
    public function it_returns_count_of_users_after_creating(): void{
        $this->ActingAsAdmin();
        $this->postJson('/api/users', [
            'name' => 'John',
            'lastname' => 'Doe',
            'date_of_birth' => '1990-01-01',
            'email' => '',
        ]);

        $response = $this->getJson('/api/v1/stats/users');
        $response->assertStatus(200)->assertJsonFragment([
            'total_users' => 1,
        ]);
    }

    #[Test]
    public function it_returns_count_of_users_after_deleting(): void{
        $this->ActingAsAdmin();
        $user = UserFactory::new()->create();

        $this->deleteJson("/api/v1/users/{$user->id}");
        $this->getJson('/api/v1/stats/users')
             ->assertStatus(200)
             ->assertJsonFragment([
                 'total_users' => 0,
             ]);
    }

    #[Test]
    public function it_includes_moderators_and_users_in_count(): void{
        UserFactory::new()->count(3)->create();
        UserFactory::new()->count(2)->create(['role' => 'moderator']);
        $this->ActingAsAdmin();

        $response = $this->getJson('/api/v1/stats/users');
        $response->assertStatus(200)->assertJsonFragment([
            'total_users' => 5,
        ]);
    }
}


?>
