<?php

namespace Tests\Traits;

use App\Models\User;
use Laravel\Passport\Passport;
use Illuminate\Database\Eloquent\Collection;
use Database\Factories\UserFactory;

trait ActingAsAdminTest
{
    protected function actingAsAdmin(): User{

        $admin = UserFactory::new()->create([
            'role' => 'admin',
            'discipline_id' => null,
        ]);
        
        if ($admin instanceof Collection) {
            $admin = $admin->first();
        }
        
        if (!$admin instanceof User) {
            throw new \RuntimeException('No se pudo crear un admin válido para testing');
        }
        
        Passport::actingAs($admin);
        
        return $admin;
    }
}