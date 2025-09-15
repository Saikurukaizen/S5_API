<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use App\Models\User;
use App\Models\Discipline;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\RefreshDatabase;

//This test checks the API endpoints for the Discipline model.
// Use the command Passport::actingAs($user) to simulate an authenticated user with different roles
//with package Passport.

//The test check if an admin user can create, update and delete a discipline
//and that a regular user or guest cannot perform these actions.

class DisciplineApiTest extends TestCase{
    
    use RefreshDatabase;

    /** @test */

    public function admin_can_create_a_discipline(): void{

        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        Passport::actingAs($admin);

        $response = $this->post('/api/disciplines', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese combat martial art',
        ]);

        $this->assertCount(1, Discipline::all());
        
        $discipline = Discipline::first();

        
        $this->assertEquals($discipline->name, 'Karate');
        $this->assertEquals($discipline->description, 'Japanese combat martial art');
    }

    /** @test */
    public function user_cannot_create_a_discipline_in_api(): void{

    }

    /** @test */
    public function guest_cannot_create_a_discipline_in_api(): void{

    }

    /** @test */
    public function admin_can_update_a_discipline_in_api(): void{

    }

    /** @test */
    public function user_cannot_update_a_discipline_in_api(): void{

    }

    /** @test */
    public function guest_cannot_update_a_discipline_in_api(): void{

    }

    /** @test */
    public function admin_can_delete_a_discipline_in_api(): void{

    }

    /** @test */
    public function user_cannot_delete_a_discipline_in_api(): void{

    }

    /** @test */
    public function guest_cannot_delete_a_discipline_in_api(): void{

    }
}
?>