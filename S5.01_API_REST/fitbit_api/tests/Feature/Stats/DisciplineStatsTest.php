<?php

namespace Tests\Feature\Stats;

use App\Models\User;
use App\Models\Discipline;
use Database\Factories\UserFactory;
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
        $response = $this->getJson('/api/v1/stats/disciplines');
        $response->assertStatus(403);
    }

    #[Test]
    public function it_cannot_access_stats_when_not_admin(): void{
        $this->actingAsUser();

        $response = $this->getJson('/api/v1/stats/disciplines');
        $response->assertStatus(403);
    }

    #[Test]
    public function it_returns_zero_when_no_disciplines_exist(): void{
        Discipline::query()->delete();

        $this->actingAsAdmin();

        $response = $this->getJson('/api/v1/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'total_disciplines' => 0,
        ]);
    }

    #[Test]
    public function it_returns_total_number_of_disciplines(): void{
        Discipline::query()->delete();
        Discipline::factory()->count(5)->create();

        $this->actingAsAdmin();

        $response = $this->getJson('/api/v1/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'total_disciplines' => 5,
        ]);
    }

    #[Test]
    public function it_returns_count_of_disciplines_after_creating(): void{
        Discipline::query()->delete();
        User::query()->delete();

        $this->actingAsAdmin();

        $discipline = Discipline::factory()->create();

        $this->postJson('/api/v1/disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese martial art',
        ]);
        $response = $this->getJson('/api/v1/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'total_disciplines' => 1,
        ]);
    }

    #[Test]
    public function it_returns_count_of_disciplines_after_deleting(): void{
        Discipline::query()->delete();
        User::query()->delete();
        
        $this->actingAsAdmin();

        $discipline = Discipline::factory()->create();

        $this->deleteJson("/api/v1/disciplines/{$discipline->id}");
        $this->getJson('/api/v1/stats/disciplines')
             ->assertStatus(200)
             ->assertJsonFragment([
                 'total_disciplines' => 0,
             ]);
    }

    #[Test]
    public function it_returns_most_popular_discipline(): void{
        User::query()->delete();
        Discipline::query()->delete();
        
        $this->actingAsAdmin();
        
        $disciplines = Discipline::factory()->count(3)->create();
        $userCounts = [];

        foreach($disciplines as $discipline){
            $count = rand(1, 10);
            UserFactory::new()->count($count)->create([
                'discipline_id' => $discipline->id,
            ]);
            $userCounts[$discipline->id] = $count;
        }

        $mostPopularId = array_search(max($userCounts), $userCounts);
        $mostPopularName = $disciplines->firstWhere('id', $mostPopularId)->name;

        $response = $this->getJson('/api/v1/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'most_popular_discipline' => $mostPopularName,
        ]);
    }

    #[Test]
    public function it_returns_percentatge_of_users_per_discipline(): void{
        User::query()->delete();
        Discipline::query()->delete();
        
        $this->actingAsAdmin();

        $disciplines = Discipline::factory()->count(3)->create();
        $userCounts = [];

        foreach($disciplines as $discipline){
            $count = rand(1, 5); // Use fixed small numbers for predictable testing
            UserFactory::new()->count($count)->create([
                'discipline_id' => $discipline->id,
            ]);
            $userCounts[$discipline->id] = $count;
        }

        $totalUsers = array_sum($userCounts);
        $expectedPercentages = [];
        foreach($disciplines as $discipline){
            $expectedPercentages[$discipline->name] = round($userCounts[$discipline->id] / $totalUsers * 100);
        }

        $response = $this->getJson('/api/v1/stats/disciplines/percentage');
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'percentages' => [
                         '*' => [
                             'discipline_name',
                             'percentage'
                         ]
                     ]
                 ]);
    }

    #[Test]
    public function it_return_ranking_of_disciplines_by_users(): void{

        User::query()->delete();
        Discipline::query()->delete();
        
        $this->actingAsAdmin();

        $disciplines = Discipline::factory()->count(3)->create();
        $userCounts = [];

        foreach($disciplines as $discipline){
            $count = rand(1, 5);
            UserFactory::new()->count($count)->create([
                'discipline_id' => $discipline->id,
            ]);
            $userCounts[$discipline->id] = $count;
        }

        $ranking = collect($disciplines)
            ->map(function($discipline) use ($userCounts){
                return [
                    'name' => $discipline->name,
                    'user_count' => $userCounts[$discipline->id] ?? 0,
                ];
            })->sortByDesc('user_count')->values()->all();

        $response = $this->getJson('/api/v1/stats/disciplines/ranking');
        $response->assertStatus(200);
        $response->assertJson(['data' => $ranking]);
    }

    #[Test]
    public function it_returns_additional_stats_fields(): void{

        User::query()->delete();
        Discipline::query()->delete();
        
        $this->actingAsAdmin();

        $disciplines = Discipline::factory()->count(3)->create();
        UserFactory::new()->count(4)->create([
            'discipline_id' => $disciplines[0]->id,
        ]);
        UserFactory::new()->count(2)->create([
            'discipline_id' => $disciplines[1]->id,
        ]);

        $totalUsers = User::count();
        $totalDisciplines = Discipline::count();
        $expectedAverage = round($totalUsers / $totalDisciplines, 2);

        $response = $this->getJson('/api/v1/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'average_users_per_discipline' => $expectedAverage,
        ]);
    }
}
?>
/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'average_users_per_discipline' => $expectedAverage,
        ]);
    }
}
?>$response = $this->getJson('/api/v1/stats/disciplines');
        $response->assertStatus(200)->assertJsonFragment([
            'average_users_per_discipline' => $expectedAverage,
        ]);
    }
}
?>
