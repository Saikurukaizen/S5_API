<?php

namespace Tests\Unit\Policies;

use Tests\TestCase;
use App\Models\User;
use App\Models\Discipline;
use App\Policies\DisciplinePolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DisciplinePolicyTest extends TestCase{

    use RefreshDatabase;

    protected DisciplinePolicy $policy;

    protected function setUp(): void{
        parent::setUp();
        $this->policy = new DisciplinePolicy();
    }

    /** @test */

    public function admin_can_create_a_discipline(): void{

        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        $this->assertTrue($this->policy->create($admin));        
    }

    /** @test */
    public function user_cannot_create_a_discipline(): void{
        $user = User::create([
            'role' => 'user',
        ]);
        $this->assertFalse($this->policy->create($user));
    }

    /** @test */
    public function guest_cannot_create_a_discipline(): void{
        $this->assertFalse($this->policy->create(null));
    }

    /** @test */
    public function admin_can_update_a_discipline(): void{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        $this->assertTrue($this->policy->update($admin, new Discipline()));
    }

    /** @test */
    public function user_cannot_update_a_discipline(): void{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        $this->assertFalse($this->policy->update($user, new Discipline()));
    }

    /** @test */
    public function guest_cannot_update_a_discipline(): void{
        $this->assertFalse($this->policy->update(null, new Discipline()));
    }

    /** @test */
    public function admin_can_delete_a_discipline(): void{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        $this->assertTrue($this->policy->delete($admin, new Discipline()));
    }

    /** @test */
    public function user_cannot_delete_a_discipline(): void{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        $this->assertFalse($this->policy->delete($user, new Discipline()));
    }

    /** @test */
    public function guest_cannot_delete_a_discipline(): void{

        $this->assertFalse($this->policy->delete(null, new Discipline()));
    }    
}