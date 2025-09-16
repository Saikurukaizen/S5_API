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
    $discipline = Discipline::create([
        'name' => 'Karate',
        'description' => 'Japanese Combat Martial Art',
    ]);

    $this->assertDatabaseHas('disciplines', [
        'name' => 'Karate',
        'description' => 'Japanese Combat Martial Art',
    ]);
    }

    #[Test]
    public function a_discipline_can_be_updated(): void{
        $discipline = Discipline::create([
            'name' => 'Karate',
            'description' => 'Japanese Combat Martial Arts',
        ]);

        $discipline::update([
            'name' => 'Judo',
            'description' => 'Japanese Grappling Martial Art',
        ]);

        $this->assertDatabaseHas('disciplines', [
            'name' => 'Judo',
            'description' => 'Japanese Grappling Martial Art',
        ]);
        
    }

    #[Test]
    public function a_discipline_can_be_deleted(){
        $discipline = Discipline::create([
            'name' => 'Karate',
            'description' => 'Japanese Combat Martial Art',
        ]);

        $this->assertDatabaseMissing('disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese Combat Martial Art',
        ]);
    }
}
