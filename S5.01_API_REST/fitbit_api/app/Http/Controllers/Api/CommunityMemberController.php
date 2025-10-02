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

    public function validateData(Request $request): array{
        return $request->validate([
            'user_id' => 'required|exists:users,id',
            'community_id' => 'required|exists:communities,id',
        ]);
    }

    public function addMember(User $user, Community $community): JsonResponse{
        $this->authorize('update', $community);

        if($community->members->contains($user->id)){
            return response()->json([
                'message' => 'User is already a member of the community.'
            ], 400);
        }

        $community->members()->attach($user->id);
        return response()->json()([
            'message' => 'User added to community successfully.'
        ], 200);
    }

    public function removeMember(User $user, Community $community): JsonResponse{
        $this->authorize('update', $community);

        if(!$community->members->contains($user->id)){
            return response()->json([
                'message' => 'User is not a member of the community.'
            ], 400);
        }

        $community->members()->detach($user->id);
        return response()->json([
            'message' => 'User removed from community successfully.'
        ], 200);
    }
}
?>