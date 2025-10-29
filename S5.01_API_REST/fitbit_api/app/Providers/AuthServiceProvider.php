<?php

namespace App\Providers;

use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ProvidersAuthServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ProvidersAuthServiceProvider{

    protected $policies = [
        User::class => UserPolicy::class,
        Community::class => CommunityPolicy::class,
    ];

    public function boot(): void{
    $this->registerPolicies();

    Passport::personalAccessTokensExpireIn(now()->addDays(15));
    Passport::enablePasswordGrant();
    }
}
