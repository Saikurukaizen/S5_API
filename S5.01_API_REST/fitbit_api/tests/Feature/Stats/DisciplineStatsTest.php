<?php

namespace Tests\Feature\Stats;

use App\Models\User;
use App\Models\Discipline;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DisciplineStatsTest extends TestCase{

    use RefreshDatabase;

    protected function actingAsAdmin(): User{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        Passport::actingAs($admin);
        return $admin;
    }

    protected function actingAsUser(): User{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        Passport::actingAs($user);
        return $user;
    }

    #[Test]
    public function it_cannot_access_if_not_authenticated(): void{
        $response = $this->getJson('/api/stats/disciplines/stats');
        $response->assertStatus(401);
    }

    #[Test]
    public function it_cannot_access_stats_when_not_admin(): void{
        $this->actingAsUser();

        $response = $this->getJson('/api/stats/disciplines/stats');
        $response->assertStatus(403);
    }

    #[Test]
    public function it_returns_total_number_of_disciplines(): void{
        Discipline::factory()->count(5)->create();
        $this->actingAsAdmin();
        $response = $this->getJson('/api/stats/disciplines/stats');
        $response->assertStatus(200)->assertJsonFragment([
            'total_disciplines' => 5,
        ]);
    }

    #[Test]
    public function it_returns_zero_when_no_disciplines_exist(): void{
        $this->actingAsAdmin();
        $response = $this->getJson('/api/stats/disciplines/stats');
        $response->assertStatus(200)->assertJsonFragment([
            'total_disciplines' => 0,
        ]);
    }

    #[Test]
    public function it_returns_count_of_disciplines_after_creating(): void{
        $this->actingAsAdmin();
        $this->postJson('/api/disciplines', [
            'name' => 'Karate',
            'description' => 'Japanese martial art',
        ]);
        $response = $this->getJson('/api/stats/disciplines/stats');
        $response->assertStatus(200)->assertJsonFragment([
            'total_disciplines' => 1,
        ]);
    }

    #[Test]
    public function it_returns_count_of_disciplines_after_deleting(): void{
        $this->actingAsAdmin();
        $discipline = Discipline::factory()->create();
        $this->deleteJson("/api/disciplines/{$discipline->id}");
        $this->getJson('/api/stats/disciplines/stats')
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

        $response = $this->getJson('/api/stats/disciplines/stats');
        $response->assertStatus(200)->assertJsonFragment([
            'most_popular_discipline' => $mostPopularName,
        ]);
    }
}
?>