<?php

namespace Tests\Traits;

use App\Models\User;
use Laravel\Passport\Passport;

trait ActingAsUserTest{
    
    protected function actingAsUser(): User{
        $user = User::factory()->create([
            'role' => 'user',
        ]);
        Passport::actingAs($user);
        return $user;
    }
}
?>