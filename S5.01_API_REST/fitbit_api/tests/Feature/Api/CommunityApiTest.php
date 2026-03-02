<?php

namespace Tests\Feature\Api;

use App\Models\User;
use App\Models\Community;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Tests\TestCase;
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