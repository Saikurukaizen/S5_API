<?php

namespace Tests\Unit\Policies;

use App\Models\Community;
use App\Models\User;
use App\Policies\CommunityPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CommunityPolicyTest extends TestCase{
    use RefreshDatabase;

    private CommunityPolicy $policy;

    protected function setUp(): void{
        parent::setUp();

        $this->policy = new CommunityPolicy();
    }

    #[Test]
    public function admin_can_manage_communities(): void{
        $admin = User::factory()->create(['role' => 'admin']);
        $community = Community::factory()->create();
        
        $this->assertTrue($this->policy->viewAny($admin));
        $this->assertTrue($this->policy->view($admin, $community));
        $this->assertTrue($this->policy->create($admin));
        $this->assertTrue($this->policy->update($admin, $community));
        $this->assertTrue($this->policy->delete($admin, $community));
    }

    #[Test]
    public function moderator_can_view_and_manage_assigned_community(): void{
        $moderator = User::factory()->create(['role' => 'moderator']);
        $community = Community::factory()->create(['user_id' => $moderator->id]);
        $otherCommunity = Community::factory()->create();
        
        $this->assertTrue($this->policy->viewAny($moderator));
        
        $this->assertTrue($this->policy->view($moderator, $community));
        $this->assertTrue($this->policy->update($moderator, $community));
        
        $this->assertFalse($this->policy->update($moderator, $otherCommunity));
        $this->assertFalse($this->policy->delete($moderator, $community));
    }

    #[Test]
    public function user_can_only_view_communities(): void{
        $user = User::factory()->create(['role' => 'user']);
        $community = Community::factory()->create();
        
        $this->assertTrue($this->policy->viewAny($user));
        $this->assertTrue($this->policy->view($user, $community));
        $this->assertFalse($this->policy->create($user));
        $this->assertFalse($this->policy->update($user, $community));
        $this->assertFalse($this->policy->delete($user, $community));
    }

    #[Test]
    public function only_admin_can_assign_moderators(): void{
        $admin = User::factory()->create(['role' => 'admin']);
        $moderator = User::factory()->create(['role' => 'moderator']);
        $user = User::factory()->create(['role' => 'user']);
        $community = Community::factory()->create();
        
        $this->assertTrue($this->policy->assignModerator($admin, $community));
        $this->assertFalse($this->policy->assignModerator($moderator, $community));
        $this->assertFalse($this->policy->assignModerator($user, $community));
    }
}