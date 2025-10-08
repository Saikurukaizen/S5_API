<?php

namespace App\Policies;

use App\Models\Community;
use App\Models\User;

class CommunityPolicy{

    public function viewAny(User $user): bool{
        return in_array($user->role, ['admin', 'moderator', 'user']);
    }

    public function view(User $user, Community $community): bool{
        return in_array($user->role, ['admin', 'moderator', 'user']);
    }

    public function create(User $user): bool{
        return $user->role === 'admin';
    }

    public function update(User $user, Community $community): bool{
        if ($user->role === 'admin'){
            return true;
        }
        
        return $user->role === 'moderator' && $user->id === $community->user_id;
    }

    public function delete(User $user, Community $community): bool{
        return $user->role === 'admin';
    }

    public function assignModerator(User $admin, Community $community): bool{
        return $admin->role === 'admin';
    }
}
?>