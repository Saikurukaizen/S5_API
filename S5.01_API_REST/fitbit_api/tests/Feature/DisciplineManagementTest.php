<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Discipline;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DisciplineManagementTest extends TestCase
{
    //This managementTest checks the CRUD operations for the Discipline model.
    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;

    #[Test]
    public function a_discipline_can_be_created(): void{
        $discipline = Discipline::factory()->create();

        $this->assertDatabaseHas('disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese Combat Martial Art',
        ]);

        $this->assertDatabaseHas('disciplines', [
            'name' => $discipline->name,
            'description' => $discipline->description,
        ]);
    }

    #[Test]
    public function a_discipline_can_be_updated(): void{
        $discipline = Discipline::factory()->create();
        $discipline->update([
            'name' => 'Karate',
            'description' => 'Japanese Combat Martial Arts',
        ]);

        $this->assertEquals('Karate', $discipline->fresh()->name);
        $this->assertEquals('Japanese Combat Martial Arts', $discipline->fresh()->description);
    }

    #[Test]
    public function a_discipline_can_be_deleted(){
        $discipline = Discipline::factory()->create();
        $discipline->delete();
        
        $this->assertDatabaseMissing('disciplines', [
            'id' => $discipline->id,
        ]);
    }

    #[Test]
    public function get_all_disciplines_returns_empty_array_when_none_exist(): void{
        $this->actingAsAdmin();
        $response = $this->getJson('/api/disciplines');
        $response->assertStatus(200)->assertExactJson([
            'data' => []
        ]);
    }

    #[Test]
    public function cannot_create_disciplines_with_empty_fields(): void{
        $this->actingAsAdmin();
        $response = $this->postJson('/api/disciplines', [
            'name' => '',
            'description' => '',
        ]);
        $response->assertStatus(422)->assertJsonValidationErrors(['name']);
        $this->assertCount(0, Discipline::all());
    }

    #[Test]
    public function it_returns_correct_data_after_crud_operations(): void{
        $this->actingAsAdmin();

        // Create
        $response = $this->postJson('/api/disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese martial art',
        ]);
        $response->assertStatus(201)->assertJsonFragment([
            'name' => 'Karate',
            'description' => 'Japanese martial art',
        ]);
        $disciplineId = $response->json('data.id');

        // Read
        $response = $this->getJson("/api/disciplines/{$disciplineId}");
        $response->assertStatus(200)->assertJsonFragment([
            'name' => 'Karate',
            'description' => 'Japanese martial art',
        ]);

        // Update
        $response = $this->putJson("/api/disciplines/{$disciplineId}", [
            'name' => 'Updated Karate',
            'description' => 'Updated description',
        ]);
        $response->assertStatus(200)->assertJsonFragment([
            'name' => 'Updated Karate',
            'description' => 'Updated description',
        ]);

        // Delete
        $response = $this->deleteJson("/api/disciplines/{$disciplineId}");
        $response->assertStatus(200)->assertJsonFragment([
            'message' => 'Discipline deleted succesfully'
        ]);

        // Verify Deletion
        $response = $this->getJson("/api/disciplines/{$disciplineId}");
        $response->assertStatus(404);
    }


}
