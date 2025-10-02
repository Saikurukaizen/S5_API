<?php

namespace Tests\Feature\Traits;

use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Tests\Traits\ActingAsUserTest;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsModeratorTest;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class TraitsTest extends TestCase
{
    use ActingAsUserTest,
        ActingAsAdminTest,
        ActingAsModeratorTest;

    #[Test]
    public function acting_as_user_trait_returns_single_user_instance(): void{

        $user = $this->actingAsUser();
        
        $this->assertInstanceOf(User::class, $user);
        $this->assertNotInstanceOf(Collection::class, $user);
        $this->assertEquals('user', $user->role);
        $this->assertIsInt($user->id);
        $this->assertNotEmpty($user->email);
    }

    #[Test]
    public function acting_as_admin_trait_returns_single_admin_instance(): void{

        $admin = $this->actingAsAdmin();
        
        $this->assertInstanceOf(User::class, $admin);
        $this->assertNotInstanceOf(Collection::class, $admin);
        $this->assertEquals('admin', $admin->role);
        $this->assertIsInt($admin->id);
        $this->assertNotEmpty($admin->email);
    }

    #[Test]
    public function acting_as_moderator_trait_returns_single_moderator_instance(): void{

        $moderator = $this->actingAsModerator();
        
        $this->assertInstanceOf(User::class, $moderator);
        $this->assertNotInstanceOf(Collection::class, $moderator);
        $this->assertEquals('moderator', $moderator->role);
        $this->assertIsInt($moderator->id);
        $this->assertNotEmpty($moderator->email);
    }

    #[Test]
    public function all_traits_return_different_user_instances(): void{
        $user = $this->actingAsUser();
        $admin = $this->actingAsAdmin();
        $moderator = $this->actingAsModerator();

        $this->assertNotEquals($user->id, $admin->id);
        $this->assertNotEquals($admin->id, $moderator->id);
        $this->assertNotEquals($user->id, $moderator->id);

        $this->assertEquals('user', $user->role);
        $this->assertEquals('admin', $admin->role);
        $this->assertEquals('moderator', $moderator->role);
    }

    #[Test]
    public function traits_can_be_used_multiple_times_in_same_test(): void{

        $user1 = $this->actingAsUser();
        $admin1 = $this->actingAsAdmin();
        
        $user2 = $this->actingAsUser();
        $admin2 = $this->actingAsAdmin();
        
        $this->assertNotEquals($user1->id, $user2->id);
        $this->assertNotEquals($admin1->id, $admin2->id);
        
        $this->assertEquals('user', $user1->role);
        $this->assertEquals('user', $user2->role);
        $this->assertEquals('admin', $admin1->role);
        $this->assertEquals('admin', $admin2->role);
    }
}