<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthRegisterController extends Controller{

    public function register(AuthRegisterRequest $request): JsonResponse{
        $user = User::create([
            'name' => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'date_of_birth' => $request->input('date_of_birth'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'bank_acc' => $request->input('bank_acc'),
            'discipline_id' => $request->input('discipline_id'),
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