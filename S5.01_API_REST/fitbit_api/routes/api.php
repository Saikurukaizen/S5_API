<?php

use App\Http\Controllers\Api\DisciplineController;
use App\Http\Controllers\Api\DisciplineStatsController;
use App\Http\Controllers\Api\CommunityController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->prefix('v1')->group(function (){

    //Disciplines only admin
    Route::apiResource('disciplines', DisciplineController::class)
    ->middleware('can:manage-disciplines');

    //Communities
    Route::apiResource('communities', CommunityController::class);

    //Users
    Route::get('/users/{id}', [UserController::class, 'me']);
    Route::put('/users/{id}/discipline', [UserController::class, 'changeDiscipline']);
    Route::post('/users/{id}/communities/{community}', [UserController::class, 'joinCommunity']);
    Route::delete('/users/{id}/communities/{community}', [UserController::class, 'leaveCommunity']);

    //Login and User Register
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::middleware(['auth:api', 'can:viewStats'])->group(function(){
    Route::get('/stats/disciplines', [DisciplineStatsController::class, 'index']);
    Route::get('/stats/disciplines/ranking', [DisciplineStatsController::class, 'ranking']);
    Route::get('/stats/disciplines/percentage', [DisciplineStatsController::class, 'percentage']);
    Route::get('/stats/disciplines/summary', [DisciplineStatsController::class, 'summary']);
});
