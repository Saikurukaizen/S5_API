<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ProvidersAuthServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ProvidersAuthServiceProvider{

    protected $policies = [];

    public function boot(): void
    {
    $this->registerPolicies();

    Passport::personalAccessTokensExpireIn(now()->addDays(15));
    Passport::enablePasswordGrant();
    }
}
