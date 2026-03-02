<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\User;
use App\Models\Discipline;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\QueryException;


class DisciplineTest extends TestCase{

    use RefreshDatabase;

    protected function setUp(): void{
        parent::setUp();
        Discipline::query()->delete();
        User::query()->delete();
    }

    #[Test]
    public function it_requires_name_and_description(): void{
        $this->expectException(QueryException::class);

        Discipline::factory()->create(['name' => null]);
        Discipline::factory()->create(['description' => null]);
    }

    #[Test]
    public function it_cannot_duplicate_discipline(): void{
        $this->expectException(QueryException::class);

        Discipline::factory()->create(['name' => 'Karate']);
        Discipline::factory()->create(['name' => 'Karate']);
    }

    #[Test]
    public function it_validates_data_types_correctly(): void{
        $this->expectException(QueryException::class);
        
        $longName = str_repeat('a', 300);
        Discipline::factory()->create(['name' => $longName]);
    }

    #[Test]
    public function it_returns_empty_collection_if_no_disciplines_exist(): void{
        $disciplines = Discipline::all();
        $this->assertTrue($disciplines->isEmpty());
    }
}

?>