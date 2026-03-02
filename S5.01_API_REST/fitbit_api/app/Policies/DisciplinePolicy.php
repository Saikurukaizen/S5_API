<?php

namespace App\Policies;

use App\Models\User;

class DisciplinePolicy{
    public function create(User $admin): bool{
        return $admin->role === 'admin';
    }

    public function update(User $admin): bool{
        return $admin->role === 'admin';
    }

    public function delete(User $admin): bool{
        return $admin->role === 'admin';
    }

    public function viewStats(User $user): bool{
        return in_array($user->role, ['admin', 'user']);
    }
}

?>