<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ProvidersAuthServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ProvidersAuthServiceProvider
{

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('viewStats', [\App\Policies\DisciplinePolicy::class, 'viewStats']);

        Passport::enablePasswordGrant();
    }
}
