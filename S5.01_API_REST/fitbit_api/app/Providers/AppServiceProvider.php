<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider{

    public function register(): void{

    }

    public function boot(): void{

        Passport::tokensCan([
            'place-orders' => 'Place orders',
            'check-status' => 'Check order status',
        ]);

        Gate::define('createUser', function ($user){
            return in_array($user->role, ['admin', 'moderator']);
        });

        Gate::define('viewAllUsers', function ($user){
            return in_array($user->role, ['admin', 'moderator']);
        });

        Gate::define('updateUser', function ($user){
            return in_array($user->role, ['admin', 'moderator']);
        });

        Gate::define('deleteUser', function ($user){
            return $user->role === 'admin';
        });

        Gate::define('manage-disciplines', function ($user){
            return $user->role === 'admin';
        });

        Gate::define('viewStats', function ($user){
            return in_array($user->role, ['admin', 'moderator']);
        });
    }
}
