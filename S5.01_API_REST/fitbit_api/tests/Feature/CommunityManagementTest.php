<?php

namespace Tests\Feature;

use App\Models\Community;
use App\Models\Discipline;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;
use Tests\Unit\Models\CommunityTest;

class CommunityManagementTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function a_community_can_be_created(): void{
        Community::query()->delete();
        $discipline = Discipline::factory()->create();
        $user = User::factory()->create();
        
        $communityData = [
            'name' => 'Hermanos del Do',
            'description' => 'Comunidad de karate avanzado',
            'discipline_id' => $discipline->id,
            'user_id' => $user->id,
        ];
        
        $community = Community::create($communityData);
        
        $this->assertInstanceOf(Community::class, $community);
        $this->assertDatabaseHas('communities', $communityData);
        $this->assertEquals('Hermanos del Do', $community->name);
    }

    #[Test]
    public function a_community_can_be_updated(): void{
        $community = Community::factory()->create([
            'name' => 'Original Name',
            'description' => 'Original Description'
        ]);
        
        $community->update([
            'name' => 'Updated Name',
            'description' => 'Updated Description'
        ]);
        
        $this->assertEquals('Updated Name', $community->fresh()->name);
        $this->assertEquals('Updated Description', $community->fresh()->description);
    }

    #[Test]
    public function a_community_can_be_deleted(): void{
        $community = Community::factory()->create();
        $communityId = $community->id;
        
        $community->delete();
        
        $this->assertDatabaseMissing('communities', ['id' => $communityId]);
    }

    #[Test]
    public function get_all_communities_returns_empty_array_when_none_exist(): void{
        Community::query()->delete();
        
        $communities = Community::all();
        
        $this->assertCount(0, $communities);
    }

    #[Test]
    public function cannot_create_communities_with_empty_fields(): void{
        $this->expectException(\Illuminate\Database\QueryException::class);
        
        Community::create([
            'name' => '',
            'description' => '',
            'discipline_id' => null,
        ]);
    }

    #[Test]
    public function community_belongs_to_discipline(): void{
        $discipline = Discipline::factory()->create(['name' => 'Karate']);
        $community = Community::factory()->create(['discipline_id' => $discipline->id]);
        
        $this->assertEquals($discipline->id, $community->discipline_id);
        $this->assertEquals('Karate', $community->discipline->name);
    }

    #[Test]
    public function community_can_have_multiple_users(): void{
        $community = Community::factory()->create();
        $users = User::factory()->count(5)->create();
        $community->members()->attach($users->pluck('id'));
        
        $this->assertCount(5, $community->fresh()->members);
        $community->members->each(function($user) use ($community) {
            $this->assertTrue($community->members->contains($user));
        });
    }

    #[Test]
    public function it_returns_correct_data_after_crud_operations(): void{
        // Create
        $discipline = Discipline::factory()->create();
        $user = User::factory()->create();
        $community = Community::create([
            'name' => 'Test Community',
            'description' => 'Test Description',
            'discipline_id' => $discipline->id,
            'user_id' => $user->id,
        ]);
        
        $this->assertDatabaseHas('communities', [
            'name' => 'Test Community',
            'discipline_id' => $discipline->id
        ]);
        
        // Update
        $community->update(['name' => 'Updated Community']);
        $this->assertEquals('Updated Community', $community->fresh()->name);
        
        // Read relationships
        $this->assertInstanceOf(Discipline::class, $community->discipline);
        
        // Delete
        $communityId = $community->id;
        $community->delete();
        $this->assertDatabaseMissing('communities', ['id' => $communityId]);
    }
}