<?php

use App\Http\Controllers\Api\DisciplineController;
use App\Http\Controllers\Api\CommunityController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Stats\DisciplineStatsController as StatsDisciplineStatsController;
use App\Http\Controllers\Stats\UserStatsController as StatsUserStatsController;

use Illuminate\Support\Facades\Route;

// ✅ RUTAS PÚBLICAS (SIN AUTENTICACIÓN) - v1
Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// ✅ RUTAS PROTEGIDAS (CON AUTENTICACIÓN) - v1
Route::middleware('auth:api')->prefix('v1')->group(function () {

    // Auth routes (requieren autenticación)
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Disciplines only admin
    Route::apiResource('disciplines', DisciplineController::class)
        ->middleware('can:manage-disciplines');

    // Communities
    // Route::apiResource('communities', CommunityController::class);

    // Users
    Route::post('/users', [UserController::class, 'store'])->middleware('can:createUser');
    Route::get('/users', [UserController::class, 'index'])->middleware('can:viewAllUsers');
    Route::get('/users/{id}', [UserController::class, 'show'])->middleware('auth:api');
    Route::put('/users/{id}', [UserController::class, 'update'])->middleware('can:updateUser');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('can:deleteUser');
    Route::put('/users/{id}/discipline', [UserController::class, 'changeDiscipline']);
    Route::post('/users/{id}/communities/{community}', [UserController::class, 'joinCommunity']);
    Route::delete('/users/{id}/communities/{community}', [UserController::class, 'leaveCommunity']);
});

// ✅ RUTAS DE ESTADÍSTICAS (CON AUTORIZACIÓN ESPECÍFICA)
Route::middleware(['auth:api', 'can:viewStats'])->prefix('v1')->group(function() {
    Route::get('/stats/disciplines', [StatsDisciplineStatsController::class, 'index']);
    Route::get('/stats/disciplines/ranking', [StatsDisciplineStatsController::class, 'ranking']);
    Route::get('/stats/disciplines/percentage', [StatsDisciplineStatsController::class, 'percentage']);
    Route::get('/stats/disciplines/summary', [StatsDisciplineStatsController::class, 'summary']);

    Route::get('/stats/users', [StatsUserStatsController::class, 'index']);
    Route::get('/stats/users/ranking', [StatsUserStatsController::class, 'ranking']);
    Route::get('/stats/users/percentage', [StatsUserStatsController::class, 'percentage']);
    Route::get('/stats/users/summary', [StatsUserStatsController::class, 'summary']);
});
