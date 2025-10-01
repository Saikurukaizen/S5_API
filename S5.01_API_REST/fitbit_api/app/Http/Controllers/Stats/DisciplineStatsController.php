<?php

namespace App\Http\Controllers\Stats;

use App\Http\Controllers\Controller;
use App\Http\Resources\DisciplineResource;
use App\Http\Resources\DisciplineStatsResource;
use App\Models\Discipline;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DisciplineStatsController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse{
        $totalDisciplines = Discipline::count();
        $totalUsers = User::count();
        $mostPopularDiscipline = Discipline::withCount('users')
            ->orderBy('users_count', 'desc')->first();

        return response()->json([
            'total_disciplines' => $totalDisciplines,
            'total_users' => $totalUsers,
            'most_popular_discipline' => $mostPopularDiscipline ? $mostPopularDiscipline->name : null,
            'average_users_per_discipline' => $totalDisciplines > 0 ? round($totalUsers / $totalDisciplines, 2) : 0,
        ]);
    }

    public function ranking(): \Illuminate\Http\JsonResponse{
        $ranking = Discipline::withCount('users')->orderByDesc('users_count')
            ->get(['id', 'name', 'users_count']);

        return response()->json([
            'ranking' => $ranking,
        ]);
    }

    public function percentage(): \Illuminate\Http\JsonResponse{
        $totalUsers = User::count();
        $percentages = Discipline::withCount('users')->get()
            ->map(function($discipline) use ($totalUsers){
                $percentage = $totalUsers > 0 ? round(($discipline->users_count / $totalUsers) * 100) : 0;
                return [
                    'discipline_name' => $discipline->name,
                    'percentage' => $percentage,
                ];
            });

        return response()->json([
            'percentages' => $percentages,
        ]);
    }

    public function summary(): \Illuminate\Http\JsonResponse{
        $monthly = Discipline::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )->groupBy('month')->get();

        return response()->json([
            'monthly_activity' => $monthly,
        ]);
    }
}
