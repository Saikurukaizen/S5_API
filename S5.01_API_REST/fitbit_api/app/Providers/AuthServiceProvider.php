<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ProvidersAuthServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ProvidersAuthServiceProvider
{

    public function boot(): void
    {
        $this->registerPolicies();

        Passport::enablePasswordGrant();
    }
}
