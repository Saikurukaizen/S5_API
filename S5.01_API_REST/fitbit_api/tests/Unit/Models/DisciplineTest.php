<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\User;
use App\Models\Community;
use App\Models\Discipline;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\QueryException;

class DisciplineTest extends TestCase{

    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_valid_discipline(): void{
        
    }
}

?>