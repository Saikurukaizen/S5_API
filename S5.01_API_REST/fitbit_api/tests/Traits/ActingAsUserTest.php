<?php

namespace Tests\Traits;

use App\Models\User;
use Database\Factories\UserFactory;
use Laravel\Passport\Passport;
use Illuminate\Database\Eloquent\Collection;

trait ActingAsUserTest
{
    protected function actingAsUser(): User{

        $user = UserFactory::new()->create([
            'role' => 'user',
            'discipline_id' => null,
        ]);
        
        if ($user instanceof Collection){
            $user = $user->first();
        }
        
        if (!$user instanceof User){
            throw new \RuntimeException('It cannot create a valid user for testing');
        }
        
        Passport::actingAs($user);
        
        return $user;
    }
}