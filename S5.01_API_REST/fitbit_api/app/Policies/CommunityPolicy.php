<?php

namespace App\Policies;

use App\Models\Community;
use App\Models\User;

class CommunityPolicy{

    public function assignModerator(User $admin, Community $community): bool{
        return $admin->role === 'admin';
    }
    public function viewAnyUser(User $user): bool{
        return in_array($user->role, ['admin', 'moderator', 'user']);
    }

    public function view(Community $community): bool{
        return in_array($community->user->role, ['admin', 'moderator', 'user']);
    }

    public function create(User $user): bool{
        if ($user->role === 'admin'){
            return true;
        }

        return false;
    }

    public function update(User $user): bool{
        return $user->role === 'admin';
    }

    public function delete(User $user, Community $community): bool{
        return $user->role === 'admin';
    }
}
?>