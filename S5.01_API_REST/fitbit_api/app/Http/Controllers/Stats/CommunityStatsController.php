<?php

namespace App\Http\Controllers\Stats;

use App\Http\Controllers\Controller;
use App\Models\Discipline;
use App\Models\Community;
use App\Models\User;
use Illuminate\Container\Attributes\DB as AttributesDB;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class CommunityStatsController extends Controller{
    
    public function index(): JsonResponse{
        $totalCommunities = Community::count();
        $totalUsers = User::count();
        $mostPopularCommunity = Community::withCount('members')
            ->orderBy('members_count', 'desc')->first();
        
        $communitiesPerDiscipline = Discipline::withCount('communities')->get();

        return response()->json([
            'total_communities' => $totalCommunities,
            'total_users' => $totalUsers,
            'most_popular_community' => $mostPopularCommunity ? [
                'id' => $mostPopularCommunity->id,
                'name' => $mostPopularCommunity->name,
                'members_count' => $mostPopularCommunity->membersCount
            ]: null,
            'communities_per_discipline' => $communitiesPerDiscipline->map(function($discipline){
                return [
                    'discipline' => $discipline->name,
                    'communities_count' => $discipline->communities_count
                ];
            })
        ]);
    }

    public function ranking(): JsonResponse{
        $topCommunities = Community::withCount('members')
            ->orderBy('members_count', 'desc')->take(10)->get();

        return response()->json([
            'top_communities' => $topCommunities->map(function($community){
                return [
                    'id' => $community->id,
                    'name' => $community->name,
                    'members_count' => $community->membersCount
                ];
            })
        ]);
    }

    public function percentage(): JsonResponse{
        $totalUsers = User::count();
        $totalCommunities = Community::count();
        $percentage = Community::withCount('members')->get()->map(function($community) use ($totalUsers){
            return [
                'id' => $community->id,
                'name' => $community->name,
                'members_count' => $community->membersCount,
                'percentage_of_total_users' => $totalUsers > 0 ? ($community->membersCount / $totalUsers) * 100 : 0
            ];
        });

        return response()->json([
            'total_users' => $totalUsers,
            'total_communities' => $totalCommunities,
            'percentage' => $percentage
        ]);
    }

    public function summary(): JsonResponse{
        $monthly = Community::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )->groupBy('month')->get();

        return response()->json([
            'monthly_community_creation' => $monthly
        ]);
    }
}

?>