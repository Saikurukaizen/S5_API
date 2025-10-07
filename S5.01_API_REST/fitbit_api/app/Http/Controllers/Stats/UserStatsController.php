<?php

namespace App\Http\Controllers\Stats;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Discipline;
use App\Http\Resources\UserStatsResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class UserStatsController extends Controller{


    public function index(): JsonResponse{
        $totalUsers = User::count();
        $totalDisciplines = Discipline::count();
        // El usuario más activo será el que tenga una disciplina asignada (o la disciplina más popular)
        $mostActiveUser = User::whereNotNull('discipline_id')->first();
        
        return response()->json([
            'data' => [
                'total_users' => $totalUsers,
                'total_disciplines' => $totalDisciplines,
                'most_active_user' => $mostActiveUser ? $mostActiveUser->name : null,
                'users' => [],
            ]
        ]);
    }

    public function ranking(): JsonResponse{
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

        return response()->json([
            'data' => [
                'ranking' => $ranking,
            ]
        ]);
    }

    public function percentage(): JsonResponse{
        $totalUsers = User::count();
        $percentagesUser = Discipline::withCount('users')->get()
            ->map(function($discipline) use ($totalUsers) {
                $percentage = $totalUsers > 0 ? round(($discipline->users_count / $totalUsers) * 100, 2) : 0;
                return [
                    'discipline_name' => $discipline->name,
                    'percentage' => $percentage,
                ];
            });

        return response()->json([
            'data' => [
                'percentages' => $percentagesUser,
            ]
        ]);
    }

    public function summary(): JsonResponse{
        $monthly = User::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy(DB::raw('MONTH(created_at)'))
        ->get();

        return response()->json([
            'data' => [
                'monthly_summary' => $monthly,
            ]
        ]);
    }
}
