<?php

use App\Http\Controllers\Api\DisciplineController;
use App\Http\Controllers\Api\CommunityController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function (){

    //Disciplines only admin
    Route::apiResource('disciplines', DisciplineController::class)
    ->middleware('can:manage-disciplines');

    //Communities
    Route::apiResource('communities', CommunityController::class);

    //Users
    Route::get('/users/me', [UserController::class, 'me']);
    Route::put('/users/{user}/discipline', [UserController::class, 'changeDiscipline']);
    Route::post('/users/{user}/communities', [UserController::class, 'joinCommunity']);
    Route::delete('/users/{user}/communities/{community}', [UserController::class, 'leaveCommunity']);
});
