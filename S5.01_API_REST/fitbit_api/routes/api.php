<?php

use App\Http\Controllers\Api\DisciplineController;
use App\Http\Controllers\Api\CommunityController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->prefix('v1')->group(function (){

    //Disciplines only admin
    Route::apiResource('disciplines', DisciplineController::class)
    ->middleware('can:manage-disciplines');

    //Communities
    Route::apiResource('communities', CommunityController::class);

    //Users
    Route::get('v1/users/{id}', [UserController::class, 'me']);
    Route::put('v1/users/{id}/discipline', [UserController::class, 'changeDiscipline']);
    Route::post('v1/users/{id}/communities/{id}', [UserController::class, 'joinCommunity']);
    Route::delete('v1/users/{id}/communities/{id}', [UserController::class, 'leaveCommunity']);
});
