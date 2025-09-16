<?php

namespace Tests\Unit\Policies;

use App\Models\User;
use App\Models\Discipline;
use App\Policies\DisciplinePolicy;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DisciplinePolicyTest extends TestCase{

    use RefreshDatabase;

    protected DisciplinePolicy $policy;

    protected function setUp(): void{
        parent::setUp();
        $this->policy = new DisciplinePolicy();
    }

    #[Test]
    public function admin_can_create_a_discipline(): void{

        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        $this->assertTrue($this->policy->create($admin));        
    }

    #[Test]
    public function user_cannot_create_a_discipline(): void{
        $user = User::create([
            'role' => 'user',
        ]);
        $this->assertFalse($this->policy->create($user));
    }

    #[Test]
    public function guest_cannot_create_a_discipline(): void{
        $this->assertFalse($this->policy->create(null));
    }

    #[Test]
    public function admin_can_update_a_discipline(): void{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        $this->assertTrue($this->policy->update($admin, new Discipline()));
    }

    #[Test]
    public function user_cannot_update_a_discipline(): void{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        $this->assertFalse($this->policy->update($user, new Discipline()));
    }

    #[Test]
    public function guest_cannot_update_a_discipline(): void{
        $this->assertFalse($this->policy->update(null, new Discipline()));
    }

    #[Test]
    public function admin_can_delete_a_discipline(): void{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        $this->assertTrue($this->policy->delete($admin, new Discipline()));
    }

    #[Test]
    public function user_cannot_delete_a_discipline(): void{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        $this->assertFalse($this->policy->delete($user, new Discipline()));
    }

    #[Test]
    public function guest_cannot_delete_a_discipline(): void{

        $this->assertFalse($this->policy->delete(null, new Discipline()));
    }    
}