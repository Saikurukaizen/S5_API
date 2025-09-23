<?php

namespace Tests\Feature\Resources;

use App\Models\Discipline;
use App\Http\Resources\DisciplineResource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DisciplineResourceTest extends TestCase{

    use RefreshDatabase;

    #[Test]
    public function it_transforms_discipline_to_json(): void{
        $discipline = Discipline::factory()->create([
            'name' => 'Karate',
            'description' => 'Japanese combat martial art',
        ]);

        $resource = new DisciplineResource($discipline);
        $json = $resource->toArray(request());

        $this->assertArrayHasKey('id', $json);
        $this->assertArrayHasKey('name', $json);
        $this->assertArrayHasKey('description', $json);
    }
}
?>