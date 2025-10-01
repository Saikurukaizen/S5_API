<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Auth\User as AuthUser;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Laravel\Passport\Passport;

abstract class TestCase extends BaseTestCase{
    protected function setUp(): void{

    parent::setUp();

    $this->artisan('migrate:fresh --seed');

    Passport::actingAs(AuthUser::factory()->create());
}
}
