<?php

namespace App\Http\Controllers\Stats;

use App\Http\Controllers\Controller;
use App\Models\Discipline;
use App\Models\Community;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Tag(
 *     name="Community Stats",
 *     description="Estadísticas de comunidades"
 * )
 */
class CommunityStatsController extends Controller{
    
    /**
     * @OA\Get(
     *      path="/api/v1/stats/communities",
     *      operationId="getCommunityStats",
     *      tags={"Community Stats"},
     *      summary="Estadísticas generales de comunidades",
     *      description="Obtiene estadísticas generales de las comunidades",
     *      security={{"bearer_token":{}}},
     *      @OA\Response(
     *          response=200,
     *          description="Estadísticas obtenidas exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="data",
     *                  type="object",
     *                  @OA\Property(property="total_communities", type="integer", example=15),
     *                  @OA\Property(property="total_users", type="integer", example=120),
     *                  @OA\Property(
     *                      property="most_popular_community",
     *                      type="object",
     *                      @OA\Property(property="id", type="integer", example=1),
     *                      @OA\Property(property="name", type="string", example="Boxing Community"),
     *                      @OA\Property(property="users_count", type="integer", example=25)
     *                  ),
     *                  @OA\Property(
     *                      property="communities_per_discipline",
     *                      type="array",
     *                      @OA\Items(
     *                          type="object",
     *                          @OA\Property(property="discipline", type="string", example="Boxing"),
     *                          @OA\Property(property="communities_count", type="integer", example=5)
     *                      )
     *                  )
     *              )
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos para ver estadísticas")
     * )
     */
    
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

    /**
     * @OA\Get(
     *      path="/api/v1/stats/communities/ranking",
     *      operationId="getCommunityRanking",
     *      tags={"Community Stats"},
     *      summary="Ranking de comunidades por miembros",
     *      description="Obtiene el top 10 de comunidades con más miembros",
     *      security={{"bearer_token":{}}},
     *      @OA\Response(
     *          response=200,
     *          description="Ranking obtenido exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="data",
     *                  type="array",
     *                  @OA\Items(
     *                      type="object",
     *                      @OA\Property(property="id", type="integer", example=1),
     *                      @OA\Property(property="name", type="string", example="Boxing Community"),
     *                      @OA\Property(property="users_count", type="integer", example=25)
     *                  )
     *              )
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos")
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/v1/stats/communities/percentage",
     *      operationId="getCommunityPercentage",
     *      tags={"Community Stats"},
     *      summary="Porcentaje de usuarios por comunidad",
     *      description="Obtiene el porcentaje de distribución de usuarios en comunidades",
     *      security={{"bearer_token":{}}},
     *      @OA\Response(
     *          response=200,
     *          description="Porcentajes obtenidos exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="data",
     *                  type="array",
     *                  @OA\Items(
     *                      type="object",
     *                      @OA\Property(property="id", type="integer", example=1),
     *                      @OA\Property(property="community_name", type="string", example="Boxing Community"),
     *                      @OA\Property(property="users_count", type="integer", example=25),
     *                      @OA\Property(property="percentage", type="number", format="float", example=20.83)
     *                  )
     *              )
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos")
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/v1/stats/communities/summary",
     *      operationId="getCommunitySummary",
     *      tags={"Community Stats"},
     *      summary="Resumen completo de comunidades",
     *      description="Obtiene un resumen detallado de estadísticas de comunidades",
     *      security={{"bearer_token":{}}},
     *      @OA\Response(
     *          response=200,
     *          description="Resumen obtenido exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="data",
     *                  type="object",
     *                  @OA\Property(property="total_communities", type="integer", example=15),
     *                  @OA\Property(property="communities_with_moderators", type="integer", example=0),
     *                  @OA\Property(property="communities_without_moderators", type="integer", example=15),
     *                  @OA\Property(property="average_members_per_community", type="number", format="float", example=8.5)
     *              )
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos")
     * )
     */
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

    /**
     * @OA\Get(
     *      path="/api/v1/stats/communities/by-discipline",
     *      operationId="getCommunitiesByDiscipline",
     *      tags={"Community Stats"},
     *      summary="Comunidades agrupadas por disciplina",
     *      description="Obtiene el número de comunidades por cada disciplina",
     *      security={{"bearer_token":{}}},
     *      @OA\Response(
     *          response=200,
     *          description="Estadísticas por disciplina obtenidas exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="data",
     *                  type="array",
     *                  @OA\Items(
     *                      type="object",
     *                      @OA\Property(property="discipline_name", type="string", example="Boxing"),
     *                      @OA\Property(property="communities_count", type="integer", example=5)
     *                  )
     *              )
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos")
     * )
     */
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