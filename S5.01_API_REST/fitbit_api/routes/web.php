<?php

use App\Http\Controllers\DisciplineController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/* Route::get('/', function () {
    return view('welcome');
}); */

Route::post('/disciplines', [DisciplineController::class, 'store']);
//Route::resource('disciplines', DisciplineController::class)->except(['create', 'edit']);

