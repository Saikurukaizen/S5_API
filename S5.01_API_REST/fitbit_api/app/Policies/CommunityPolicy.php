<?php

namespace App\Policies;

use App\Models\Community;
use App\Models\User;

class CommunityPolicy{

    
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

    public function update(User $user, Community $community): bool{
        if($user->role === 'admin'){
            return true;
        }

        return false;
    }

    public function BanAnyUser(User $user): bool{
        if($user->role === 'admin' && $user->role === 'moderator'){
            return true;
        }

        return false;
    }

    public function delete(User $user, Community $community): bool{
        if($user->role === 'admin'){
            return true;
        }

        return false;
    }
}
?>