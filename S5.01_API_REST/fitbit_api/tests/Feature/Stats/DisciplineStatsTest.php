<?php

namespace Tests\Feature\Stats;

use App\Models\User;
use App\Models\Discipline;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DisciplineStatsTest extends TestCase{

    use RefreshDatabase;

    #[Test]
    public function it_calculates_total_number_of_disciplines(): void{
        
    }
}
?>