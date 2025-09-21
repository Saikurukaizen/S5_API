<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Discipline;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DisciplineManagementTest extends TestCase
{
    //This managementTest checks the CRUD operations for the Discipline model.
    use RefreshDatabase;

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
}
