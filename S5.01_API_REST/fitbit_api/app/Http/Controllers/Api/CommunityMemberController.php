<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Community;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CommunityMemberController extends Controller{

    use AuthorizesRequests;

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


    public function addMember(Community $community, User $user): JsonResponse{
        $this->authorize('update', $community);

        if($community->members->contains($user->id)){
            return response()->json([
                'message' => 'User is already a member of the community.'
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

    public function removeMember(Community $community, User $user): JsonResponse{
        $this->authorize('update', $community);

        if(!$community->members->contains($user->id)){
            return response()->json([
                'message' => 'User is not a member of the community.',
                'error' => 'User not found in community members.'
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
}
?>