<?php

namespace Tests\Feature\Stats;

use App\Models\Community;
use App\Models\Discipline;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CommunityStatsTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_cannot_access_if_not_authenticated(): void{
        $response = $this->getJson('/api/v1/stats/communities');
        
        $response->assertStatus(401);
    }

    #[Test]
    public function it_cannot_access_stats_when_not_admin(): void{
        $this->actingAsUser();
        
        $response = $this->getJson('/api/v1/stats/communities');
        
        $response->assertStatus(403);
    }

    #[Test]
    public function it_returns_zero_when_no_communities_exist(): void{
        Community::query()->delete();
        $this->actingAsAdmin();
        
        $response = $this->getJson('/api/v1/stats/communities');
        
        $response->assertStatus(200);
        $response->assertJsonPath('data.total_communities', 0);
    }

    #[Test]
    public function it_returns_total_number_of_communities(): void{
        Community::query()->delete();
        $this->actingAsAdmin();
        
        Community::factory()->count(5)->create();
        
        $response = $this->getJson('/api/v1/stats/communities');
        
        $response->assertStatus(200);
        $response->assertJsonPath('data.total_communities', 5);
    }

    #[Test]
    public function it_returns_count_of_communities_after_creating(): void{
        Community::query()->delete();
        $this->actingAsAdmin();
        
        // Initially 0
        $response = $this->getJson('/api/v1/stats/communities');
        $response->assertJsonPath('data.total_communities', 0);
        
        // Create 3 communities
        Community::factory()->count(3)->create();
        
        $response = $this->getJson('/api/v1/stats/communities');
        $response->assertJsonPath('data.total_communities', 3);
    }

    #[Test]
    public function it_returns_count_of_communities_after_deleting(): void{
        Community::query()->delete();
        $this->actingAsAdmin();
        
        $communities = Community::factory()->count(4)->create();
        
        // Initial count
        $response = $this->getJson('/api/v1/stats/communities');
        $response->assertJsonPath('data.total_communities', 4);
        
        // Delete one community
        $communities->first()->delete();
        
        $response = $this->getJson('/api/v1/stats/communities');
        $response->assertJsonPath('data.total_communities', 3);
    }

    #[Test]
    public function it_returns_most_popular_community(): void{
        Community::query()->delete();
        User::query()->delete();
        $this->actingAsAdmin();
        
        $community1 = Community::factory()->create(['name' => 'Small Community']);
        $community2 = Community::factory()->create(['name' => 'Popular Community']);
        $community3 = Community::factory()->create(['name' => 'Medium Community']);
        
        // Create users for each community
        User::factory()->count(2)->create(['community_id' => $community1->id]);
        User::factory()->count(8)->create(['community_id' => $community2->id]);
        User::factory()->count(5)->create(['community_id' => $community3->id]);
        
        $response = $this->getJson('/api/v1/stats/communities');
        
        $response->assertStatus(200);
        $response->assertJsonPath('data.most_popular_community.name', 'Popular Community');
        $response->assertJsonPath('data.most_popular_community.users_count', 8);
    }

    #[Test]
    public function it_returns_percentage_of_users_per_community(): void{
        Community::query()->delete();
        User::query()->delete();
        $this->actingAsAdmin();
        
        $community1 = Community::factory()->create(['name' => 'Community A']);
        $community2 = Community::factory()->create(['name' => 'Community B']);
        
        // Create 6 users in community1 and 4 in community2 (total 10)
        User::factory()->count(6)->create(['community_id' => $community1->id]);
        User::factory()->count(4)->create(['community_id' => $community2->id]);
        
        $response = $this->getJson('/api/v1/stats/communities/percentage');
        
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'community_name',
                    'users_count',
                    'percentage'
                ]
            ]
        ]);
        
        // Check that percentages add up to 100% (60% + 40%)
        $data = $response->json('data');
        $totalPercentage = array_sum(array_column($data, 'percentage'));
        $this->assertEquals(100, $totalPercentage);
    }

    #[Test]
    public function it_return_ranking_of_communities_by_users(): void{
        Community::query()->delete();
        User::query()->delete();
        $this->actingAsAdmin();

        $communities = Community::factory()->count(3)->create();
        $userCounts = [];

        foreach($communities as $community){
            $count = rand(1, 5);
            User::factory()->count($count)->create([
                'community_id' => $community->id,
            ]);
            $userCounts[$community->id] = $count;
        }

        $response = $this->getJson('/api/v1/stats/communities/ranking');
        
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'name',
                    'users_count'
                ]
            ]
        ]);
        
        // Verify ranking is ordered by user count (descending)
        $data = $response->json('data');
        for($i = 0; $i < count($data) - 1; $i++){
            $this->assertGreaterThanOrEqual($data[$i + 1]['users_count'], $data[$i]['users_count']);
        }
    }

    #[Test]
    public function it_returns_communities_per_discipline_stats(): void{
        Community::query()->delete();
        Discipline::query()->delete();
        $this->actingAsAdmin();
        
        $karate = Discipline::factory()->create(['name' => 'Karate']);
        $judo = Discipline::factory()->create(['name' => 'Judo']);
        
        // Create communities for each discipline
        Community::factory()->count(3)->create(['discipline_id' => $karate->id]);
        Community::factory()->count(2)->create(['discipline_id' => $judo->id]);
        
        $response = $this->getJson('/api/v1/stats/communities/by-discipline');
        
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'discipline_name',
                    'communities_count'
                ]
            ]
        ]);
    }

    #[Test]
    public function it_returns_additional_stats_fields(): void{
        $this->actingAsAdmin();
        Community::factory()->count(3)->create();
        
        $response = $this->getJson('/api/v1/stats/communities/summary');
        
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'total_communities',
                'communities_with_moderators',
                'communities_without_moderators',
                'average_users_per_community',
                'most_active_discipline'
            ]
        ]);
    }
}