<?php

use App\Http\Controllers\Api\DisciplineController;
use App\Http\Controllers\Api\CommunityController;
use App\Http\Controllers\Api\CommunityMemberController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Stats\DisciplineStatsController;
use App\Http\Controllers\Stats\UserStatsController;
use App\Http\Controllers\Stats\CommunityStatsController;

use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function (){
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    

    Route::get('/disciplines', [DisciplineController::class, 'index']);
    Route::get('/disciplines/{discipline}', [DisciplineController::class, 'show']);

    Route::get('/communities', [CommunityController::class, 'index']);
    Route::get('/communities/{community}', [CommunityController::class, 'show']);
});

Route::middleware(['auth:api'])->prefix('v1')->group(function (){

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/disciplines', [DisciplineController::class, 'store'])
        ->middleware('can:manage-disciplines');
    Route::put('/disciplines/{discipline}', [DisciplineController::class, 'update'])
        ->middleware('can:manage-disciplines');
    Route::delete('/disciplines/{discipline}', [DisciplineController::class, 'destroy'])
        ->middleware('can:manage-disciplines');

    Route::get('/communities/create', [CommunityController::class, 'create'])
        ->middleware('can:manage-communities');
    Route::post('/communities', [CommunityController::class, 'store'])
        ->middleware('can:manage-communities');
    Route::put('/communities/{community}', [CommunityController::class, 'update'])
        ->middleware('can:manage-communities');
    Route::delete('/communities/{community}', [CommunityController::class, 'destroy'])
        ->middleware('can:manage-communities');

    Route::get('/communities/{community}/members',[CommunityMemberController::class, 'index']);
    Route::post('/communities/{community}/members/{user}', [CommunityMemberController::class, 'addMember']);
    Route::delete('/communities/{community}/members/{user}', [CommunityMemberController::class, 'removeMember']);

    Route::post('/users', [UserController::class, 'store'])->middleware('can:createUser');
    Route::get('/users', [UserController::class, 'index'])->middleware('can:viewAllUsers');
    Route::put('/users/{id}', [UserController::class, 'update'])->middleware('can:updateUser');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('can:deleteUser');

    Route::get('/users/{id}', [UserController::class, 'show']);    
    Route::put('/users/{id}/discipline', [UserController::class, 'changeDiscipline']);
    Route::post('/users/{id}/communities/{community}', [UserController::class, 'joinCommunity']);
    Route::delete('/users/{id}/communities/{community}', [UserController::class, 'leaveCommunity']);
});


Route::middleware(['auth:api', 'can:viewStats'])->prefix('v1')->group(function(){
    Route::get('/stats/disciplines', [DisciplineStatsController::class, 'index']);
    Route::get('/stats/disciplines/ranking', [DisciplineStatsController::class, 'ranking']);
    Route::get('/stats/disciplines/percentage', [DisciplineStatsController::class, 'percentage']);
    Route::get('/stats/disciplines/summary', [DisciplineStatsController::class, 'summary']);

    Route::get('/stats/users', [UserStatsController::class, 'index']);
    Route::get('/stats/users/ranking', [UserStatsController::class, 'ranking']);
    Route::get('/stats/users/percentage', [UserStatsController::class, 'percentage']);
    Route::get('/stats/users/summary', [UserStatsController::class, 'summary']);

    Route::get('/stats/communities', [CommunityStatsController::class, 'index']);
    Route::get('/stats/communities/ranking', [CommunityStatsController::class, 'ranking']);
    Route::get('/stats/communities/percentage', [CommunityStatsController::class, 'percentage']);
    Route::get('/stats/communities/summary', [CommunityStatsController::class, 'summary']);
    Route::get('/stats/communities/by-discipline', [CommunityStatsController::class, 'byDiscipline']);
});
