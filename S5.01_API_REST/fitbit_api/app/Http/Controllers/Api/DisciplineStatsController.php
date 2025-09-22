<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DisciplineResource;
use App\Models\Discipline;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DisciplineStatsController extends Controller
{
    public function index(): DisciplineResource{

        $totalDisciplines = Discipline::count();
        $totalUsers = User::count();
        $mostPopularDiscipline = Discipline::withCount('users')
            ->orderBy('users_count', 'desc')->first();

        $data = [
            'total_disciplines' => $totalDisciplines,
            'total_users' => $totalUsers,
            'most_popular_discipline' => $mostPopularDiscipline ? $mostPopularDiscipline->name: null,
        ];

        return new DisciplineResource($data);
    }

    public function ranking(): DisciplineResource{

        $ranking = Discipline::withCount('users')->orderByDesc('users_count')
        ->get([
            'id',
            'name',
            'users_count'
        ]);

        return new DisciplineResource(['ranking' => $ranking]);
    }

    public function percentage(): DisciplineResource{
        $totalUsers = User::count();
        $percentages = Discipline::withCount('users')->get()
        ->map(function($discipline) use ($totalUsers){
            $percentage = $totalUsers > 0 ? round(($discipline->users_count / $totalUsers) * 100) : 0;
            return [
                'discipline_name' => $discipline->name,
                'percentage' => $percentage,
            ];
        });

        return new DisciplineResource(['percentages' => $percentages]);
    }

    public function summary(): DisciplineResource{
        $monthly = Discipline::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )->groupBy('month')->get();


        return new DisciplineResource(['monthly_activity' => $monthly]);
    }
}
