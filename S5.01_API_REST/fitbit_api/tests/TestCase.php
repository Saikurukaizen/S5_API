<?php

namespace Tests;

use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Laravel\Passport\Passport;

abstract class TestCase extends BaseTestCase{
    protected function setUp(): void{

    parent::setUp();

    $this->artisan('migrate:fresh --seed');

    Passport::actingAs(UserFactory::new()->create());
}
}
