<?php

namespace Tests\Unit\Policies;

use App\Models\Discipline;
use App\Models\User;
use App\Policies\DisciplinePolicy;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DisciplinePolicyTest extends TestCase{

    use RefreshDatabase;

    protected DisciplinePolicy $policy;
    use ActingAsAdminTest;
    use ActingAsUserTest;
    
    protected function setUp(): void{
        parent::setUp();
        $this->policy = new DisciplinePolicy();

        Discipline::query()->delete();
        User::query()->delete();
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
}