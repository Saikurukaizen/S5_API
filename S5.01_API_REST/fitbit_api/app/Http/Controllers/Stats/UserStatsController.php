<?php

namespace App\Http\Controllers\Stats;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Discipline;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserStatsResource;
use Illuminate\Support\Facades\DB;

class UserStatsController extends Controller{


    public function index(): UserStatsResource{
        $totalUsers = User::count();
        $totalDisciplines = Discipline::count();
        // El usuario más activo será el que tenga una disciplina asignada (o la disciplina más popular)
        $mostActiveUser = User::whereNotNull('discipline_id')->first();
        $data = [
            'total_users' => $totalUsers,
            'total_disciplines' => $totalDisciplines,
            'most_active_user' => $mostActiveUser ? $mostActiveUser->name : null,
            'users' => UserResource::collection(User::all()),
        ];
        return new UserStatsResource($data);
    }

    public function rankingUser(): UserStatsResource
    {
        // Obtener usuarios con disciplina
        $usersWithDiscipline = User::whereNotNull('discipline_id')->with('discipline')->get();

        // Agrupar usuarios por disciplina_id
        $grouped = $usersWithDiscipline->groupBy('discipline_id');

        // Construir el ranking
        $ranking = $grouped->map(function ($users, $disciplineId) {
            $discipline = $users->first()->discipline;
            return [
                'discipline_id' => $disciplineId,
                'discipline_name' => $discipline ? $discipline->name : null,
                'user_count' => $users->count(),
                'users' => $users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'lastname' => $user->lastname,
                    ];
                })->values(),
            ];
        })->values();

        $data = [
            'ranking' => $ranking,
        ];
        return new UserStatsResource($data);
    }

    public function percentageUser(): UserStatsResource{
        $totalUsers = User::count();
        $percentagesUser = Discipline::withCount('users')->get()
            ->map(function($discipline) use ($totalUsers) {
                $percentage = $totalUsers > 0 ? round(($discipline->users_count / $totalUsers) * 100, 2) : 0;
                return [
                    'discipline_name' => $discipline->name,
                    'percentage' => $percentage,
                ];
            });

        $data = [
            'percentages' => $percentagesUser,
        ];
        return new UserStatsResource($data);
    }

    public function summaryUser(): UserStatsResource{
        $monthly = User::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy(DB::raw('MONTH(created_at)'))
        ->get();

        $data = [
            'monthly_summary' => $monthly,
        ];
        return new UserStatsResource($data);
    }
}
