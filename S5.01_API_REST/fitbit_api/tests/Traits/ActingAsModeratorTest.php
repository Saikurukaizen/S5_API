<?php

namespace Tests\Traits;

use App\Models\User;
use Database\Factories\UserFactory;
use Laravel\Passport\Passport;
use Illuminate\Database\Eloquent\Collection;

trait ActingAsModeratorTest
{
    protected function actingAsModerator(): User{

        $moderator = UserFactory::new()->create([
            'role' => 'moderator',
            'discipline_id' => null,
        ]);
        
        if ($moderator instanceof Collection){
            $moderator = $moderator->first();
        }
        
        if (!$moderator instanceof User){
            throw new \RuntimeException('It cannot create a valid moderator for testing');
        }
        
        Passport::actingAs($moderator);
        
        return $moderator;
    }
}