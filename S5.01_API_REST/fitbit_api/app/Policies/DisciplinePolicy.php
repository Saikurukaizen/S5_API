<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Discipline;

class DisciplinePolicy{
    public function create(User $admin): bool{
        return $admin->role === 'admin';
    }

    public function update(User $admin, Discipline $discipline): bool{
        return $admin->role === 'admin';
    }

    public function delete(User $admin, Discipline $discipline): bool{
        return $admin->role === 'admin';
    }
}

?>