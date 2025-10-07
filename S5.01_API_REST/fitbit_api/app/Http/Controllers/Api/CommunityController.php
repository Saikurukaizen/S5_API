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