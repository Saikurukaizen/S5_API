<?php

namespace App\Http\Controllers\Stats;

use App\Http\Controllers\Controller;
use App\Models\Discipline;
use App\Models\Community;
use App\Models\User;
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
            'data' => [
                'total_communities' => $totalCommunities,
                'total_users' => $totalUsers,
                'most_popular_community' => $mostPopularCommunity ? [
                    'id' => $mostPopularCommunity->id,
                    'name' => $mostPopularCommunity->name,
                    'users_count' => $mostPopularCommunity->members_count
                ]: null,
                'communities_per_discipline' => $communitiesPerDiscipline->map(function($discipline){
                    return [
                        'discipline' => $discipline->name,
                        'communities_count' => $discipline->communities_count
                    ];
                })
            ]
        ]);
    }

    public function ranking(): JsonResponse{
        $topCommunities = Community::withCount('members')
            ->orderBy('members_count', 'desc')->take(10)->get();

        return response()->json([
            'data' => $topCommunities->map(function($community){
                return [
                    'id' => $community->id,
                    'name' => $community->name,
                    'users_count' => $community->members_count
                ];
            })
        ]);
    }

    public function percentage(): JsonResponse{
        $totalUsersInCommunities = DB::table('community_user')->count();
        $percentage = Community::withCount('members')->get()->map(function($community) use ($totalUsersInCommunities){
            return [
                'id' => $community->id,
                'community_name' => $community->name,
                'users_count' => $community->members_count,
                'percentage' => $totalUsersInCommunities > 0 ? ($community->members_count / $totalUsersInCommunities) * 100 : 0
            ];
        });

        return response()->json([
            'data' => $percentage
        ]);
    }

    public function summary(): JsonResponse{
        $totalCommunities = Community::count();
        $communitiesWithModerators = 0; // Assuming no moderator field for now
        $communitiesWithoutModerators = $totalCommunities;
        
        $totalMembers = DB::table('community_user')->count();
        $averageUsersPerCommunity = $totalCommunities > 0 ? $totalMembers / $totalCommunities : 0;
        
        $mostActiveDiscipline = Discipline::withCount('communities')
            ->orderBy('communities_count', 'desc')
            ->first();

        return response()->json([
            'data' => [
                'total_communities' => $totalCommunities,
                'communities_with_moderators' => $communitiesWithModerators,
                'communities_without_moderators' => $communitiesWithoutModerators,
                'average_users_per_community' => round($averageUsersPerCommunity, 2),
                'most_active_discipline' => $mostActiveDiscipline ? $mostActiveDiscipline->name : null
            ]
        ]);
    }

    public function byDiscipline(): JsonResponse{
        $communitiesPerDiscipline = Discipline::withCount('communities')->get();

        return response()->json([
            'data' => $communitiesPerDiscipline->map(function($discipline){
                return [
                    'discipline_name' => $discipline->name,
                    'communities_count' => $discipline->communities_count
                ];
            })
        ]);
    }
}

?>