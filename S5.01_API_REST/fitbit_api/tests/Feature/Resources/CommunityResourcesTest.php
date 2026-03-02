<?php

namespace Tests\Feature\Resources;

use App\Http\Resources\CommunityResource;
use App\Models\Community;
use App\Models\Discipline;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CommunityResourcesTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_returns_expected_fields_in_community_list(): void{
        $this->actingAsAdmin();
        
        $discipline = Discipline::factory()->create();
        $moderator = User::factory()->create(['role' => 'moderator']);
        $community = Community::factory()->create([
            'discipline_id' => $discipline->id,
        ]);
        
        $response = $this->getJson('/api/v1/communities');
        
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'description',
                    'discipline_id',
                    'user_id',
                    'created_at',
                    'updated_at',
                    'discipline' => [
                        'id',
                        'name',
                        'description'
                    ],
                    'moderator' => [
                        'id',
                        'name',
                        'role'
                    ],
                    'users_count'
                ]
            ]
        ]);
    }

    #[Test]
    public function it_returns_correct_values(): void{
        $this->actingAsAdmin();
        
        $discipline = Discipline::factory()->create(['name' => 'Karate']);
        $moderator = User::factory()->create([
            'name' => 'John Moderator',
            'role' => 'moderator'
        ]);
        
        $community = Community::factory()->create([
            'name' => 'Hermanos del Do',
            'description' => 'Comunidad avanzada',
            'discipline_id' => $discipline->id,
            'user_id' => $moderator->id,
        ]);
        
        // Create some users in the community
        $users = User::factory()->count(3)->create();
        $community->members()->attach($users->pluck('id'));
        
        $response = $this->getJson('/api/v1/communities/' . $community->id);
        
        $response->assertStatus(200);
        $response->assertJsonPath('data.name', 'Hermanos del Do');
        $response->assertJsonPath('data.description', 'Comunidad avanzada');
        $response->assertJsonPath('data.discipline.name', 'Karate');
        $response->assertJsonPath('data.moderator.name', 'John Moderator');
        $response->assertJsonPath('data.users_count', 3);
    }

    #[Test]
    public function it_does_not_return_extra_fields(): void{
        $this->actingAsAdmin();
        
        $community = Community::factory()->create();
        
        $response = $this->getJson('/api/v1/communities/' . $community->id);
        
        $response->assertStatus(200);
        $response->assertJsonMissing([
            'password',
            'remember_token',
            'email_verified_at',
            'internal_notes',
            'secret_data'
        ]);
    }

    #[Test]
    public function it_returns_a_json_format(): void{
        $this->actingAsAdmin();
        
        $community = Community::factory()->create();
        
        $response = $this->getJson('/api/v1/communities');
        
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/json');
        
        $data = $response->json();
        $this->assertIsArray($data);
        $this->assertArrayHasKey('data', $data);
    }

    #[Test]
    public function community_resource_transforms_correctly(): void{
        $discipline = Discipline::factory()->create(['name' => 'Judo']);
        $moderator = User::factory()->create([
            'name' => 'Jane Moderator',
            'role' => 'moderator'
        ]);
        
        $community = Community::factory()->create([
            'name' => 'Elite Judo',
            'description' => 'Elite practitioners',
            'discipline_id' => $discipline->id,
            'user_id' => $moderator->id,
        ]);
        
        // Create users to test count
        $users = User::factory()->count(2)->create();
        $community->members()->attach($users->pluck('id'));
        
        $resource = new CommunityResource($community->load(['discipline', 'user', 'members']));
        $array = $resource->toArray(request());
        
        $this->assertEquals('Elite Judo', $array['name']);
        $this->assertEquals('Elite practitioners', $array['description']);
        $this->assertEquals('Judo', $array['discipline']['name']);
        $this->assertEquals('Jane Moderator', $array['moderator']['name']);
        $this->assertEquals(2, $array['users_count']);
    }
}