<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommunityResource;
use App\Models\Discipline;
use App\Models\Community;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Get(
 *      path="/api/v1/communities",
 *      operationId="getCommunities",
 *      tags={"Communities"},
 *      summary="Obtener lista de comunidades",
 *      description="Devuelve lista paginada de comunidades",
 *      @OA\Response(
 *          response=200,
 *          description="Lista de comunidades",
 *          @OA\JsonContent(
 *              @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Community"))
 *          )
 *      )
 * )
 */

class CommunityController extends Controller{

    use AuthorizesRequests;

    protected function validateData(Request $request): array{
        return $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'discipline_id' => 'required|exists:disciplines,id',
        ]);
    }

    public function index(): JsonResponse{
        $communities = Community::with(['discipline', 'user', 'members'])->get();

        return response()->json([
            'data' => CommunityResource::collection($communities)
        ], 200);
    }

    /**
 * @OA\Post(
 *      path="/api/v1/communities",
 *      operationId="createCommunity",
 *      tags={"Communities"},
 *      summary="Crear nueva comunidad",
 *      description="Crea una nueva comunidad (solo admin)",
 *      security={{"bearer_token":{}}},
 *      @OA\RequestBody(
 *          required=true,
 *          description="Datos de la comunidad",
 *          @OA\JsonContent(
 *              required={"name","discipline_id"},
 *              @OA\Property(property="name", type="string", example="Boxing Community"),
 *              @OA\Property(property="description", type="string", example="Community for boxing enthusiasts"),
 *              @OA\Property(property="discipline_id", type="integer", example=1)
 *          ),
 *      ),
 *      @OA\Response(
 *          response=201,
 *          description="Comunidad creada exitosamente",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Community created successfully"),
 *              @OA\Property(property="data", ref="#/components/schemas/Community")
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="No autorizado"
 *      ),
 *      @OA\Response(
 *          response=403,
 *          description="Acceso denegado"
 *      )
 * )
 */

    public function create(): JsonResponse{
        $this->authorize('create', Community::class);

        $communities = Community::all();
        $disciplines = Discipline::all();

        return response()->json([
            'data' => [
                'communities' => $communities,
                'disciplines' => $disciplines
            ]
        ], 200);
    }

    public function show(Community $community): JsonResponse{
        $this->authorize('view', $community);
        
        $community->load(['discipline', 'user', 'members']);

        return response()->json([
            'data' => new CommunityResource($community)
        ], 200);
    }

    public function store(Request $request): JsonResponse{
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $this->authorize('create', Community::class);
        $data = $this->validateData($request);
        $data['user_id'] = $user->id;
        $community = Community::create($data);

        return response()->json([
            'message' => 'Community created successfully',
            'data' => $community
        ], 201);
    }

    public function update(Request $request, Community $community): JsonResponse{
        $this->authorize('update', $community);
        $data = $this->validateData($request);
        $community->update($data);

        return response()->json([
            'message' => 'Community updated successfully',
            'data' => $community
        ], 200);
    }
    
    public function destroy(Request $request, Community $community): JsonResponse{
        $this->authorize('delete', $community);

        $community->delete();

        return response()->json([
            'message' => 'Community deleted successfully'
        ], 200);
    }
}
?>