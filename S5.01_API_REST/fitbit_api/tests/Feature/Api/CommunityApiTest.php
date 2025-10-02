<?php

namespace Tests\Feature\Api;
use App\Models\Discipline;
use App\Models\User;
use App\Models\Community;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Tests\Traits\ActingAsModeratorTest;

class CommunityApiTest extends TestCase{
    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;
    use ActingAsModeratorTest;

    public function setUp(): void{
        parent::setUp();

        Community::query()->delete();
        User::query()->delete();
    }
}
?>