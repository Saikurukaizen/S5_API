<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DisciplineResource;
use App\Http\Resources\DisciplineStatsResource;
use App\Models\Discipline;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DisciplineStatsController extends Controller
{
    public function index(): \App\Http\Resources\DisciplineStatsResource{
        $totalDisciplines = Discipline::count();
        $totalUsers = User::count();
        $mostPopularDiscipline = Discipline::withCount('users')
            ->orderBy('users_count', 'desc')->first();

        $data = [
            'total_disciplines' => $totalDisciplines,
            'total_users' => $totalUsers,
            'most_popular_discipline' => $mostPopularDiscipline ? $mostPopularDiscipline->name : null,
            'disciplines' => DisciplineResource::collection(Discipline::all()),
        ];
        return new DisciplineStatsResource($data);
    }

    public function ranking(): DisciplineStatsResource{
        $ranking = Discipline::withCount('users')->orderByDesc('users_count')
            ->get([
                'id',
                'name',
                'users_count'
            ]);

        $data = [
            'ranking' => $ranking,
            'disciplines' => DisciplineResource::collection(Discipline::all()),
        ];
        return new DisciplineStatsResource($data);
    }

    public function percentage(): DisciplineStatsResource{
        $totalUsers = User::count();
        $percentages = Discipline::withCount('users')->get()
            ->map(function($discipline) use ($totalUsers){
                $percentage = $totalUsers > 0 ? round(($discipline->users_count / $totalUsers) * 100) : 0;
                return [
                    'discipline_name' => $discipline->name,
                    'percentage' => $percentage,
                ];
            });

        $data = [
            'percentages' => $percentages,
            'disciplines' => \App\Http\Resources\DisciplineResource::collection(Discipline::all()),
        ];
        return new DisciplineStatsResource($data);
    }

    public function summary(): DisciplineStatsResource{
        $monthly = Discipline::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )->groupBy('month')->get();

        $data = [
            'monthly_activity' => $monthly,
            'disciplines' => DisciplineResource::collection(Discipline::all()),
        ];
        return new DisciplineStatsResource($data);
    }
}
