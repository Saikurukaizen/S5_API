<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{


    public function register(Request $request): JsonResponse{
        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'bank_acc' => 'nullable|string|max:50',
            'discipline_id' => 'nullable|exists:disciplines,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'date_of_birth' => $request->date_of_birth,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'bank_acc' => $request->bank_acc,
            'discipline_id' => $request->discipline_id,
            'role' => 'user',
        ]);

        $tokenResult = $user->createToken('API Token');
        $token = $tokenResult->token;
        
        $token->expires_at = now()->addDays(15);
        $token->save();

        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => $token->expires_at->toISOString(),
        ], 201);
    }

    public function login(Request $request): JsonResponse{
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $tokenResult = $user->createToken('API Token');
        $token = $tokenResult->token;
        
        $token->expires_at = now()->addDays(15);
        $token->save();

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => $token->expires_at->toISOString(),
        ]);
    }

    public function logout(Request $request): JsonResponse{
        $request->user()->tokens()->delete();
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }
}
?>