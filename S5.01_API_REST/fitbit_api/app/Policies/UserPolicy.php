<?php

namespace App\Policies;

use App\Models\Community;
use App\Models\User;

class UserPolicy{

    public function viewAnyModelBeingAdminOrModerator(User $user): bool{
        return in_array($user->role, ['admin', 'moderator']);
    }

    public function view(User $user, User $model): bool{
        return $user->id === $model->id || in_array($user->role, ['admin', 'moderator']);
    }

    public function createModelsBeingAdmin(User $user): bool{
        return $user->role === 'admin';
    }

    public function updateBeingAdmin(User $user, User $model): bool{
        if ($user->role !== 'admin'){
            return false;
        }

        if ($user->id === $model->id){
            return false;
        }        

        if ($model->role === 'admin'){
            return false;
        }

        return true;
    }

    public function deleteBeingAdmin(User $user, User $model): bool{
        // Solo admin puede eliminar
        if ($user->role !== 'admin'){
            return false;
        }
        
        // Si el modelo a eliminar es admin
        if ($model->role === 'admin'){
            // Si es a sí mismo, verificar que no sea el último admin
            if ($user->id === $model->id){
                $totalAdmins = User::where('role', 'admin')->count();

                return $totalAdmins > 1;
            }
            // Un admin no puede eliminar a otro admin
            return false;
        }
        
        return true;
    }

    public function viewBankAccBeingAdmin(User $user): bool{
        return $user->role === 'admin';
    }

    public function assignRoleBeingAdmin(User $user): bool{
        return $user->role === 'admin';
    }

    public function grantTempBanPermissionBeingAdmin(User $user): bool{
        return $user->role === 'admin';
    }

    public function banUser(User $user, Community $community, User $target): bool{
        if($target->role === 'admin' || $target->id === $community->moderator_id){
            return false;
        }

        return $user->role === 'admin' || (
            $user->role === 'moderator' && $community->moderator === $user->id
        );
    }

    public function unbanUser(User $user, Community $community, User $target): bool{
        return $this->banUser($user, $community, $target);
    }
}