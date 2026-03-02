<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Community;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CommunityUserController extends Controller{
    /**
     * @OA\Post(
     *      path="/api/v1/communities/{community}/users/{user}",
     *      operationId="addUserToCommunity",
     *      tags={"Community Members"},
     *      summary="Añadir usuario a comunidad",
     *      description="Añade un usuario a la comunidad (solo admin/moderador)",
     *      security={{"bearer_token":{}}},
     *      @OA\Parameter(
     *          name="community",
     *          in="path",
     *          required=true,
     *          description="ID de la comunidad",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\Parameter(
     *          name="user",
     *          in="path",
     *          required=true,
     *          description="ID del usuario",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Usuario añadido exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="User added to community successfully."),
     *              @OA\Property(property="data", type="object",
     *                  @OA\Property(property="user_id", type="integer", example=1),
     *                  @OA\Property(property="community_id", type="integer", example=1),
     *                  @OA\Property(property="joined_at", type="string", format="date-time", example="2025-10-29T12:00:00Z")
     *              )
     *          )
     *      ),
     *      @OA\Response(response=400, description="Usuario ya es miembro"),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos")
     * )
     */
    public function addUser(Community $community, User $user): JsonResponse{
        $this->authorize('update', $community);
        if($community->members->contains($user->id)){
            return response()->json([
                'message' => 'User is already a member of the community.',
                'error_code' => 2001
            ], 400);
        }
        $community->members()->attach($user->id);
        return response()->json([
            'message' => 'User added to community successfully.',
            'data' => [
                'user_id' => $user->id,
                'community_id' => $community->id,
                'joined_at' => now()
            ]
        ], 201);
    }

    /**
     * @OA\Delete(
     *      path="/api/v1/communities/{community}/users/{user}",
     *      operationId="removeUserFromCommunity",
     *      tags={"Community Members"},
     *      summary="Eliminar usuario de comunidad",
     *      description="Elimina un usuario de la comunidad (solo admin/moderador)",
     *      security={{"bearer_token":{}}},
     *      @OA\Parameter(
     *          name="community",
     *          in="path",
     *          required=true,
     *          description="ID de la comunidad",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\Parameter(
     *          name="user",
     *          in="path",
     *          required=true,
     *          description="ID del usuario",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Usuario eliminado exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="User removed from community successfully."),
     *              @OA\Property(property="data", type="object",
     *                  @OA\Property(property="user_id", type="integer", example=1),
     *                  @OA\Property(property="community_id", type="integer", example=1),
     *                  @OA\Property(property="removed_at", type="string", format="date-time", example="2025-10-29T12:00:00Z")
     *              )
     *          )
     *      ),
     *      @OA\Response(response=400, description="Usuario no es miembro"),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos")
     * )
     */
    public function removeUser(Community $community, User $user): JsonResponse{
        $this->authorize('update', $community);
        if(!$community->members->contains($user->id)){
            return response()->json([
                'message' => 'User is not a member of the community.',
                'error' => 'User not found in community members.',
                'error_code' => 2002
            ], 400);
        }
        $community->members()->detach($user->id);
        return response()->json([
            'message' => 'User removed from community successfully.',
            'data' => [
                'user_id' => $user->id,
                'community_id' => $community->id,
                'removed_at' => now()
            ]
        ], 200);
    }

    use AuthorizesRequests;

    /**
     * @OA\Get(
     *      path="/api/v1/communities/{community}/users",
     *      operationId="listCommunityMembers",
     *      tags={"Community Members"},
     *      summary="Listar miembros de comunidad",
     *      description="Devuelve la lista paginada de miembros de una comunidad (solo admin/moderador)",
     *      security={{"bearer_token":{}}},
     *      @OA\Parameter(
     *          name="community",
     *          in="path",
     *          required=true,
     *          description="ID de la comunidad",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Lista de miembros obtenida exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/User")),
     *              @OA\Property(property="meta", type="object",
     *                  @OA\Property(property="total", type="integer", example=10),
     *                  @OA\Property(property="per_page", type="integer", example=10),
     *                  @OA\Property(property="last_page", type="integer", example=1),
     *                  @OA\Property(property="current_page", type="integer", example=1)
     *              )
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos")
     * )
     */
    public function index(Community $community): JsonResponse{
        $this->authorize('view', $community);
        
        $members = $community->members()->paginate(10);

        return response()->json([
            'data' => $members->items(),
            'meta' => [
                'total' => $members->total(),
                'per_page' => $members->perPage(),
                'last_page' => $members->lastPage(),
                'current_page' => $members->currentPage()
            ]
        ], 200);
    }


    
}
?>