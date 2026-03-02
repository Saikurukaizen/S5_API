<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthRegisterController extends Controller{

    public function register(AuthRegisterRequest $request): JsonResponse{
        $validated = $request->validated();
        $user = User::create([
            'name' => $validated['name'],
            'lastname' => $validated['lastname'],
            'date_of_birth' => $validated['date_of_birth'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'bank_acc' => $validated['bank_acc'],
            'discipline_id' => $validated['discipline_id'],
        ]);

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $expiresAt = $tokenResult->token->expires_at;       
        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => $expiresAt
        ], 201);
    }
}
?>