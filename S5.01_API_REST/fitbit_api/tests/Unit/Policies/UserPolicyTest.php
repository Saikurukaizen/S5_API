<?php

namespace Tests\Features;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Tests\Traits\ActingAsModeratorTest;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class UserPolicyTest extends TestCase{

    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;
    use ActingAsModeratorTest;

    #[Test]
    public function admin_can_view_any_user(): void{
        $this->actingAsAdmin();
        $this->assertTrue($this->ActingAsAdmin()->can('viewAny', User::class));

        $response = $this->getJson('/api/v1/users');
        $response->assertStatus(200);
    }

    #[Test]
    public function user_can_view_own_profile(): void{
        $this->actingAsUser();
        
        $response = $this->getJson('/api/v1/users/' . $this->actingAsUser()->id);
        $response->assertStatus(200);
    }

    #[Test]
    public function user_cannot_view_other_users(): void{
        $this->actingAsUser();
        $this->assertFalse($this->actingAsUser()->can('viewAny', User::class));

        $response = $this->getJson('/api/v1/users');
        $response->assertStatus(403);
    }

    #[Test]
    public function admin_can_see_bank_acc(): void{
        $this->actingAsAdmin();
        $this->assertTrue($this->ActingAsAdmin()->can('viewBankAcc', User::class));

        $response = $this->getJson('/api/v1/users');
        $response->assertStatus(200);
    }

    #[Test]
    public function user_cannot_see_bank_acc(): void{
        $this->actingAsUser();
        $this->assertFalse($this->actingAsUser()->can('viewBankAcc', User::class));

        $response = $this->getJson('/api/v1/users');
        $response->assertStatus(403);
    }

    #[Test]
    public function admin_can_assign_role(): void{
        $this->actingAsAdmin();
        $this->assertTrue($this->ActingAsAdmin()->can('assignRole', User::class));
    }

    #[Test]
    public function user_cannot_assign_role(): void{
        $this->actingAsUser();
        $this->assertFalse($this->actingAsUser()->can('assignRole', User::class));
    }

    #[Test]
    public function moderator_can_temporaily_ban_user_with_admin_permission(): void{
        $this->actingAsAdmin();
        $moderator = $this->actingAsModerator();
        $this->assertFalse($moderator->can('tempBan', User::class));
        $this->assertTrue($this->ActingAsAdmin()->can('grantTempBanPermission', User::class));
    }
}
?>