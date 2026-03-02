<?php

use App\Http\Controllers\Api\DisciplineController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::resource('/disciplines', DisciplineController::class)->only(['index', 'show']);


