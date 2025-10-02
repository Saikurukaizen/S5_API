<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Traits\ActingAsUserTest;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsModeratorTest;

abstract class TestCase extends BaseTestCase
{
    use ActingAsUserTest,
        ActingAsAdminTest,
        ActingAsModeratorTest;
}
