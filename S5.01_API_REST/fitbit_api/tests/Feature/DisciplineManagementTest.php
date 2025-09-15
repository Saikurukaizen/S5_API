<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Discipline;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DisciplineManagementTest extends TestCase
{
    //This managementTest checks the CRUD operations for the Discipline model.
    use RefreshDatabase;
    /** @test */ 
   /*  public function admin_can_create_a_discipline(): void{

        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        
        $discipline = Discipline::create([
            'name' => 'Karate',
            'description' => 'Japanese combat martial art',
        ]);

        $this->assertDatabaseHas('disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese combat martial art',
        ]);

    }

    public function user_cannot_create_a_discipline(): void{
        $user = User::factory()->create([
            'role' => 'user',
        ]);

        $this->expectException(\Illuminate\Auth\AuthenticationException::class);
        $this->actingAs($user);
        Discipline::create([
            'name' => 'Karate',
            'description' => 'Japanese combat martial art',
        ]);
    }

    public function guest_cannot_create_a_discipline(): void{
        $this->expectException(\Illuminate\Auth\AuthenticationException::class);
    } */
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
