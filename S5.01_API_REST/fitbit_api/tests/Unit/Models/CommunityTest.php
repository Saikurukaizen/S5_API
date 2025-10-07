<?php

namespace Tests\Unit\Models;

use App\Models\Community;
use App\Models\Discipline;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CommunityTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_requires_name_description_and_discipline_id(): void{
        $community = new Community();
        $community->name = 'Test Community';
        $community->description = 'Test Description';
        $community->discipline_id = 1;
        
        $this->assertInstanceOf(Community::class, $community);
        $this->assertEquals('Test Community', $community->name);
        $this->assertEquals('Test Description', $community->description);
        $this->assertEquals(1, $community->discipline_id);
    }

    #[Test]
    public function it_cannot_duplicate_community_name_within_same_discipline(): void{
        $discipline = Discipline::factory()->create();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        
        Community::create([
            'name' => 'Hermanos del Do',
            'description' => 'Primera comunidad',
            'discipline_id' => $discipline->id,
            'user_id' => $user1->id,
        ]);
        
        $this->expectException(\Illuminate\Database\QueryException::class);
        
        Community::create([
            'name' => 'Hermanos del Do',
            'description' => 'Segunda comunidad',
            'discipline_id' => $discipline->id,
            'user_id' => $user2->id,
        ]);
    }

    #[Test]
    public function it_can_have_same_name_in_different_disciplines(): void{
        $karate = Discipline::factory()->create(['name' => 'Karate']);
        $judo = Discipline::factory()->create(['name' => 'Judo']);
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        
        $community1 = Community::create([
            'name' => 'Warriors',
            'description' => 'Karate Warriors',
            'discipline_id' => $karate->id,
            'user_id' => $user1->id,
        ]);
        
        $community2 = Community::create([
            'name' => 'Warriors',
            'description' => 'Judo Warriors',
            'discipline_id' => $judo->id,
            'user_id' => $user2->id,
        ]);
        
        $this->assertNotEquals($community1->id, $community2->id);
        $this->assertEquals('Warriors', $community1->name);
        $this->assertEquals('Warriors', $community2->name);
    }

    #[Test]
    public function it_belongs_to_a_discipline(): void{
        $discipline = Discipline::factory()->create();
        $community = Community::factory()->create(['discipline_id' => $discipline->id]);
        
        $this->assertInstanceOf(Discipline::class, $community->discipline);
        $this->assertEquals($discipline->id, $community->discipline->id);
    }

    #[Test]
    public function it_has_many_users(): void{
        $community = Community::factory()->create();
        $users = User::factory()->count(3)->create();
        $community->members()->attach($users->pluck('id'));
        
        $this->assertCount(3, $community->members);
        $this->assertInstanceOf(User::class, $community->members->first());
    }

    #[Test]
    public function it_validates_data_types_correctly(): void{
        $user = User::factory()->create();
        $community = new Community();
        $community->name = 123; // Should be string
        $community->description = true; // Should be string
        $community->discipline_id = 'invalid'; // Should be integer
        $community->user_id = $user->id;
        
        $this->expectException(\Illuminate\Database\QueryException::class);
        $community->save();
    }
}