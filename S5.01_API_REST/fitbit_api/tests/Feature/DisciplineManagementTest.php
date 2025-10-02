<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Discipline;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DisciplineManagementTest extends TestCase{

    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;

    #[Test]
    public function a_discipline_can_be_created(): void{

        Discipline::query()->delete();
        
        $discipline = Discipline::factory()->create();

        $this->assertDatabaseHas('disciplines', [
            'name' => $discipline->name,
            'description' => $discipline->description,
        ]);
    }

    #[Test]
    public function a_discipline_can_be_updated(): void{

        Discipline::query()->delete();
        
        $discipline = Discipline::factory()->create([
            'name' => 'Original Name',
            'description' => 'Original Description'
        ]);
        
        $discipline->update([
            'name' => 'Updated Karate',
            'description' => 'Updated Japanese Combat Martial Arts',
        ]);

        $this->assertEquals('Updated Karate', $discipline->fresh()->name);
        $this->assertEquals('Updated Japanese Combat Martial Arts', $discipline->fresh()->description);
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
        Discipline::query()->delete();
        
        $this->actingAsAdmin();
        $response = $this->getJson('/api/v1/disciplines');
        $response->assertStatus(200)->assertExactJson([
            'data' => []
        ]);
    }

    #[Test]
    public function cannot_create_disciplines_with_empty_fields(): void{
        Discipline::query()->delete();
        
        $this->actingAsAdmin();
        $response = $this->postJson('/api/v1/disciplines', [
            'name' => '',
            'description' => '',
        ]);
        $response->assertStatus(422)->assertJsonValidationErrors(['name']);
        $this->assertCount(0, Discipline::all());
    }

    #[Test]
    public function it_returns_correct_data_after_crud_operations(): void{
        Discipline::query()->delete();
        
        $this->actingAsAdmin();

        $response = $this->postJson('/api/v1/disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese martial art',
        ]);
        $response->assertStatus(201)->assertJsonFragment([
            'name' => 'Karate',
            'description' => 'Japanese martial art',
        ]);
        $disciplineId = $response->json('data.id');

        $response = $this->getJson("/api/v1/disciplines/{$disciplineId}");
        $response->assertStatus(200)->assertJsonFragment([
            'name' => 'Karate',
            'description' => 'Japanese martial art',
        ]);

        $response = $this->putJson("/api/v1/disciplines/{$disciplineId}", [
            'name' => 'Swimming Updated',
            'description' => 'Water sport activity updated',
        ]);
        $response->assertStatus(200)->assertJsonFragment([
            'name' => 'Swimming Updated',
            'description' => 'Water sport activity updated',
        ]);

        $response = $this->deleteJson("/api/v1/disciplines/{$disciplineId}");
        $response->assertStatus(200)->assertJsonFragment([
            'message' => 'Discipline deleted successfully'
        ]);

        $response = $this->getJson("/api/v1/disciplines/{$disciplineId}");
        $response->assertStatus(404);
    }
}
