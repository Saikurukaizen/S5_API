<?php

namespace Tests\Traits;

use App\Models\User;
use Laravel\Passport\Passport;

trait ActingAsAdminTest{
    protected function actingAsAdmin(): User{
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        Passport::actingAs($admin);
        return $admin;
    }
}
?>