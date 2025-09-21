<?php

namespace Tests\Unit\Policies;

use App\Models\User;
use App\Models\Discipline;
use App\Policies\DisciplinePolicy;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;

class DisciplinePolicyTest extends TestCase{

    use RefreshDatabase;

    protected DisciplinePolicy $policy;

    protected function actingAsAdmin(): User{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        Passport::actingAs($admin);
        return $admin;
    }

    protected function actingAsUser(): User{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        Passport::actingAs($user);
        return $user;
    }

    protected function setUp(): void{
        parent::setUp();
        $this->policy = new DisciplinePolicy();
    }

    #[Test]
    public function admin_can_manage_disciplines(): void{
        $admin = $this->actingAsAdmin();
        $discipline = Discipline::factory()->create();

        $this->assertTrue($this->policy->create($admin));
        $this->assertTrue($this->policy->update($admin, $discipline));
        $this->assertTrue($this->policy->delete($admin, $discipline));
    }

    public function user_cannot_manage_disciplines(): void{
        $user = $this->actingAsUser();
        $discipline = Discipline::factory()->create();

        $this->assertFalse($this->policy->create($user));
        $this->assertFalse($this->policy->update($user, $discipline));
        $this->assertFalse($this->policy->delete($user, $discipline));
    }

    /* public function guest_cannot_manage_disciplines(): void{
        $discipline = Discipline::factory()->create();

        $this->assertFalse($this->policy->create(null));
        $this->assertFalse($this->policy->update(null, $discipline));
        $this->assertFalse($this->policy->delete(null, $discipline));
    } */
}