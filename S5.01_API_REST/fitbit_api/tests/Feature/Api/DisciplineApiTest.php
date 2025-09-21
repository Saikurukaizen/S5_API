<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use App\Models\User;
use App\Models\Discipline;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

//This test checks the API endpoints for the Discipline model.
// Use the command Passport::actingAs($user) to simulate an authenticated user with different roles
//with package Passport.

//The test check if an admin user can create, update and delete a discipline
//and that a regular user or guest cannot perform these actions.

class DisciplineApiTest extends TestCase{
    
    use RefreshDatabase;

    #[Test]
    public function admin_can_create_a_discipline_in_api(): void{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        Passport::actingAs($admin);

        $response = $this->postJson('/api/disciplines', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(201)->assertJsonFragment([
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        /* $this->assertDatabaseHas('disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese combat martial art',
        ]); */

        $this->assertCount(1, Discipline::all());
        
        $discipline = Discipline::first();

        
        $this->assertEquals($discipline->name, 'Karate');
        $this->assertEquals($discipline->description, 'Japanese combat martial art');
    }

    #[Test]
    public function user_cannot_create_a_discipline_in_api(): void{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        Passport::actingAs($user);

        $response = $this->postJson('/api/disciplines', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(403);
        $this->assertCount(0, Discipline::all());
    }

   /*  #[Test]
    public function guest_cannot_create_a_discipline_in_api(): void{
        $response = $this->postJson('/api/disciplines', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(401);
    } */

    #[Test]
    public function admin_can_read_all_disciplines(){
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        Passport::actingAs($admin);

        $response = $this->getJson('/api/disciplines');
            $response->assertStatus(200)->assertJsonStructure([
                'data' => [
                    [
                        'id',
                        'name',
                        'description',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
        }

    #[Test]
    public function admin_can_update_a_discipline_in_api(): void{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        Passport::actingAs($admin);

        $response = $this->post('/api/disciplines/{id}', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(201)->assertJsonFragment([
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        /* $this->assertDatabaseHas('disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese combat martial art',
        ]); */
    }

    #[Test]
    public function user_cannot_update_a_discipline_in_api(): void{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        Passport::actingAs($user);

        $response = $this->postJson('/api/disciplines/{id}', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(403);
        $this->assertCount(0, Discipline::all());
    }

    /* #[Test]
    public function guest_cannot_update_a_discipline_in_api(): void{
        $response = $this->postJson('/api/disciplines/{id}', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(401);
    } */

    #[Test]
    public function admin_can_delete_a_discipline_in_api(): void{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        Passport::actingAs($admin);

        $response = $this->postJson('/api/disciplines/{id}', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(201)->assertJsonFragment([
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);
        $this->assertCount(1, Discipline::all());
    }

    #[Test]
    public function user_cannot_delete_a_discipline_in_api(): void{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        Passport::actingAs($user);

        $response = $this->postJson('/api/discipline/{id}', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);
        $response->assertStatus(403);
        $this->assertCount(0, Discipline::all());
    }

    /* #[Test]
    public function guest_cannot_delete_a_discipline_in_api(): void{
        $response = $this->postJson('/api/disciplines/{id}', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(401);
    } */
}
?>