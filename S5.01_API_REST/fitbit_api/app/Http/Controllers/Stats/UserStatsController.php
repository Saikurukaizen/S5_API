<?php

namespace App\Http\Controllers\Stats;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Discipline;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserStatsResource;

class UserStatsController extends Controller{

    public function index(): UserStatsResource{
        $totalUsers = User::count();
        $totalDisciplines = Discipline::count();
        $mostActiveUser = User::withCount('activities')
            ->orderBy('activities_count', 'desc')->first();
        
        $data = [
            'total_users' => $totalUsers,
            'total_disciplines' => $totalDisciplines,
            'most_active_user' => $mostActiveUser ? $mostActiveUser->name : null,
            'users' => UserResource::collection(User::all()),
        ];
    return new UserStatsResource($data);
    }
}
