<?php

namespace Tests\Feature\Stats;

use App\Models\User;
use App\Models\Discipline;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;

class DisciplineStatsTest extends TestCase{

    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;

    #[Test]
    public function it_cannot_access_if_not_authenticated(): void{
        $response = $this->getJson('/api/stats/disciplines');
        $response->assertStatus(401);
    }

    #[Test]
    public function it_cannot_access_stats_when_not_admin(): void{
        $this->actingAsUser();

        $response = $this->getJson('/api/stats/disciplines');
        $response->assertStatus(403);
    }

    #[Test]
    public function it_returns_zero_when_no_disciplines_exist(): void{
        $this->actingAsAdmin();
        $response = $this->getJson('/api/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'total_disciplines' => 0,
        ]);
    }

    #[Test]
    public function it_returns_total_number_of_disciplines(): void{
        Discipline::factory()->count(5)->create();
        $this->actingAsAdmin();
        $response = $this->getJson('/api/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'total_disciplines' => 5,
        ]);
    }

    #[Test]
    public function it_returns_count_of_disciplines_after_creating(): void{
        $this->actingAsAdmin();
        $this->postJson('/api/disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese martial art',
        ]);
        $response = $this->getJson('/api/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'total_disciplines' => 1,
        ]);
    }

    #[Test]
    public function it_returns_count_of_disciplines_after_deleting(): void{
        $this->actingAsAdmin();
        $discipline = Discipline::factory()->create();
        $this->deleteJson("/api/v1/disciplines/{$discipline->id}");
        $this->getJson('/api/stats/disciplines')
             ->assertStatus(200)
             ->assertJsonFragment([
                 'total_disciplines' => 0,
             ]);
    }

    #[Test]
    public function it_returns_most_popular_discipline(): void{
        $this->actingAsAdmin();
        
        $disciplines = Discipline:: factory()->count(3)->create();
        $userCounts = [];

        foreach($disciplines as $discipline){
            $count = rand(1, 10);
            User::factory()->count($count)->create([
                'discipline_id' => $discipline->id,
            ]);
            $userCounts[$discipline->name] = $count;
        }

        $mostPopularId = array_search(max($userCounts), $userCounts);
        $mostPopularName = $disciplines->firstWhere('id', $mostPopularId)->name;

        $response = $this->getJson('/api/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'most_popular_discipline' => $mostPopularName,
        ]);
    }

    #[Test]
    public function it_returns_percentatge_of_users_per_discipline(): void{
        $this->actingAsAdmin();

        $disciplines = Discipline::factory()->count(3)->create();
        $userCounts = [];

        foreach($disciplines as $discipline){
            User::factory()->count($userCounts[$discipline->name])->create([
                'discipline_id' => $discipline->id,
            ]);
        }

        $totalUsers = array_sum($userCounts);
        $expectedPercentages = [];
        foreach($disciplines as $i => $discipline){
            $expectedPercentages[$discipline->name] = round($userCounts[$i] / $totalUsers * 100);
        }

        $response = $this->getJson('/api/stats/disciplines/percentage');
        $response->assertStatus(200);
        foreach($expectedPercentages as $name => $percentage){
            $response->assertJsonFragment([
                'name' => $name,
                'percentage' => $percentage,
            ]);
        }
    }

    #[Test]
    public function it_return_ranking_of_disciplines_by_users(): void{
        $this->actingAsAdmin();

        $disciplines = Discipline::factory()->count(3)->create();
        $userCounts = [];

        foreach($disciplines as $discipline){
            User::factory()->count($userCounts[$discipline->name])->create([
                'discipline_id' => $discipline->id,
            ]);
        }

        $ranking = collect($disciplines)
            ->map(function($discipline, $i) use ($userCounts){
                return [
                    'name' => $discipline->name,
                    'user_count' => $userCounts[$i] ?? 0,
                ];
            })->sortByDesc('users')->values()->all();

        $response = $this->getJson('/api/stats/disciplines/ranking');
        foreach($ranking as $rank){
            $response->assertJsonFragment($rank);
        }
    }

    #[Test]
    public function it_returns_additional_stats_fields(): void{
        $this->actingAsAdmin();

        $disciplines = Discipline::factory()->count(3)->create();
        User::factory()->count(5)->create([
            'discipline_id' => $disciplines[0]->id,
        ]);
        User::factory()->count(3)->create([
            'discipline_id' => $disciplines[1]->id,
        ]);

        $totalUsers = User::count();
        $totalDisciplines = Discipline::count();
        $expectedAverage = $totalUsers / $totalDisciplines;

        $response = $this->getJson('/api/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'average_users_per_discipline' => $expectedAverage,
        ]);
    }
}
?>