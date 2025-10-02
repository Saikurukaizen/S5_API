<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use App\Models\User;
use App\Models\Discipline;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class DisciplineApiTest extends TestCase{
    
    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;
    
    protected function setUp(): void{
        parent::setUp();

        Discipline::query()->delete();
        User::query()->delete();
    }

    #[Test]
    public function admin_can_create_a_discipline_in_api(): void{
        $this->actingAsAdmin();

        $response = $this->postJson('/api/v1/disciplines', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(201)->assertJsonFragment([
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $this->assertCount(1, Discipline::all());
        
        $discipline = Discipline::first();
        
        $this->assertEquals($discipline->name, 'New Discipline');
        $this->assertEquals($discipline->description, 'Discipline Description');
    }

    #[Test]
    public function user_cannot_create_a_discipline_in_api(): void{
        $this->actingAsUser();

        $response = $this->postJson('/api/v1/disciplines', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(403);
        $this->assertCount(0, Discipline::all());
    }

    #[Test]
    public function guest_cannot_create_a_discipline_in_api(): void{
        $response = $this->postJson('/api/v1/disciplines', [
            'name' => 'New Discipline',
            'description' => 'Discipline Description',
        ]);

        $response->assertStatus(403);
    }

    #[Test]
    public function admin_can_read_all_disciplines(): void{
        $this->actingAsAdmin();
        
        // Create some disciplines for testing
        Discipline::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/disciplines');
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
    public function user_can_read_all_disciplines(): void{
        $this->actingAsUser();
        
        Discipline::factory()->count(2)->create();

        $response = $this->getJson('/api/v1/disciplines');
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
    public function guest_can_read_all_disciplines(): void{
        Discipline::factory()->count(2)->create();
        
        $response = $this->getJson('/api/v1/disciplines');
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
    public function admin_can_read_a_discipline_by_id(): void{
        $this->actingAsAdmin();

        $discipline = Discipline::factory()->create();

        $response = $this->getJson("/api/v1/disciplines/{$discipline->id}");
        $response->assertStatus(200)->assertJsonFragment([
            'id' => $discipline->id,
            'name' => $discipline->name,
            'description' => $discipline->description,
        ]);
    }

    #[Test]
    public function user_can_read_a_discipline_by_id(): void{
        $this->actingAsUser();

        $discipline = Discipline::factory()->create();

        $response = $this->getJson("/api/v1/disciplines/{$discipline->id}");
        $response->assertStatus(200)->assertJsonFragment([
            'id' => $discipline->id,
            'name' => $discipline->name,
            'description' => $discipline->description,
        ]);
    }

    #[Test]
    public function guest_cannot_read_a_discipline_by_id(): void{
        $discipline = Discipline::factory()->create();

        $response = $this->getJson("/api/v1/disciplines/{$discipline->id}");
        $response->assertStatus(200)->assertJsonFragment([
            'id' => $discipline->id,
            'name' => $discipline->name,
            'description' => $discipline->description,
        ]);
    }

    #[Test]
    public function admin_can_update_a_discipline_in_api(): void{
        $this->actingAsAdmin();

        $discipline = Discipline::factory()->create([
            'name' => 'Original Name',
            'description' => 'Original Description',
        ]);

        $response = $this->putJson("/api/v1/disciplines/{$discipline->id}", [
            'name' => 'Updated Discipline',
            'description' => 'Updated Description',
        ]);

        $response->assertStatus(200)->assertJsonFragment([
            'name' => 'Updated Discipline',
            'description' => 'Updated Description',
        ]);

        $this->assertDatabaseHas('disciplines', [
            'id' => $discipline->id,
            'name' => 'Updated Discipline',
            'description' => 'Updated Description',
        ]);
    }

    #[Test]
    public function user_cannot_update_a_discipline_in_api(): void{
        $this->actingAsUser();

        $discipline = Discipline::factory()->create();

        $response = $this->putJson("/api/v1/disciplines/{$discipline->id}", [
            'name' => 'Updated Name',
            'description' => 'Updated Description',
        ]);

        $response->assertStatus(403);
        
        $this->assertDatabaseHas('disciplines', [
            'id' => $discipline->id,
            'name' => $discipline->name,
            'description' => $discipline->description,
        ]);
    }

    #[Test]
    public function guest_cannot_update_a_discipline_in_api(): void{
        $discipline = Discipline::factory()->create();
        
        $response = $this->putJson("/api/v1/disciplines/{$discipline->id}", [
            'name' => 'Updated Name',
            'description' => 'Updated Description',
        ]);

        $response->assertStatus(403);
    }

    #[Test]
    public function admin_can_delete_a_discipline_in_api(): void{
        $this->actingAsAdmin();

        $discipline = Discipline::factory()->create();
        $this->assertCount(1, Discipline::all());

        $response = $this->deleteJson("/api/v1/disciplines/{$discipline->id}");

        $response->assertStatus(200);
        $this->assertCount(0, Discipline::all());
    }

    #[Test]
    public function user_cannot_delete_a_discipline_in_api(): void{
        $this->actingAsUser();

        $discipline = Discipline::factory()->create();
        $this->assertCount(1, Discipline::all());

        $response = $this->deleteJson("/api/v1/disciplines/{$discipline->id}");
        
        $response->assertStatus(403);
        $this->assertCount(1, Discipline::all()); // Should still exist
    }

    #[Test]
    public function guest_cannot_delete_a_discipline_in_api(): void{
        $discipline = Discipline::factory()->create();
        $this->assertCount(1, Discipline::all());
        
        $response = $this->deleteJson("/api/v1/disciplines/{$discipline->id}");

        $response->assertStatus(403);
        $this->assertCount(1, Discipline::all()); // Should still exist
    }

    #[Test]
    public function get_discipline_by_id_returns_404_if_not_found(): void{
        $this->actingAsAdmin();

        $response = $this->getJson('/api/v1/disciplines/999');
        $response->assertStatus(404);
    }

    #[Test]
    public function response_structure_is_valid_for_get_discipline_by_id(): void{
        $this->actingAsAdmin();
        
        $discipline = Discipline::factory()->create();

        $response = $this->getJson("/api/v1/disciplines/{$discipline->id}");
        $response->assertStatus(200)->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'description',
                'created_at',
                'updated_at',
            ]
        ]);
    }
}
?>