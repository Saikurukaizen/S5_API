<?php

use App\Http\Controllers\Api\DisciplineController;
use App\Http\Controllers\Api\Stats\UserStatsController;
use App\Http\Controllers\Api\Stats\DisciplineStatsController;
use App\Http\Controllers\Api\CommunityController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Stats\DisciplineStatsController as StatsDisciplineStatsController;
use App\Http\Controllers\Stats\UserStatsController as StatsUserStatsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->prefix('v1')->group(function (){

    //Disciplines only admin
    Route::apiResource('disciplines', DisciplineController::class)
    ->middleware('can:manage-disciplines');

    //Communities
    //Route::apiResource('communities', CommunityController::class);

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
    Route::get('/stats/disciplines', [StatsDisciplineStatsController::class, 'index']);
    Route::get('/stats/disciplines/ranking', [StatsDisciplineStatsController::class, 'ranking']);
    Route::get('/stats/disciplines/percentage', [StatsDisciplineStatsController::class, 'percentage']);
    Route::get('/stats/disciplines/summary', [StatsDisciplineStatsController::class, 'summary']);

    Route::get('/stats/users', [StatsUserStatsController::class, 'index']);
    Route::get('/stats/users/ranking', [StatsUserStatsController::class, 'ranking']);
    Route::get('/stats/users/percentage', [StatsUserStatsController::class, 'percentage']);
    Route::get('/stats/users/summary', [StatsUserStatsController::class, 'summary']);
});
