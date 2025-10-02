<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Discipline;
use App\Models\Community;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommunityController extends Controller{
    protected function validateData(Request $request): array{
        return $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'discipline_id' => 'required|exists:disciplines,id',
        ]);
    }

    public function index(): JsonResponse{
        $communities = Community::all();

        return response()->json([
            'data' => $communities
        ], 200);
    }

    public function show(int $id): JsonResponse{
        $community = Community::findOrFail($id);

        return response()->json([
            'data' => $community
        ], 200);
    }

    public function store(Request $request): JsonResponse{
        $data = $this->validateData($request);
        $community = Community::create($data);

        return response()->json([
            'message' => 'Community created succesfully',
            'data' => $community
        ], 201);
    }
}
?>