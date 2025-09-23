<?php

namespace Tests\Traits;

use App\Models\User;
use Laravel\Passport\Passport;

trait ActingAsModeratorTest{
    protected function actingAsModerator(): User{
        $moderator = User::factory()->create([
            'role' => 'moderator',
        ]);
        Passport::actingAs($moderator);
        return $moderator;
    }
}

?>