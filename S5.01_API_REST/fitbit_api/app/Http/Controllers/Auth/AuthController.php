<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Post(
 *      path="/api/v1/register",
 *      operationId="register",
 *      tags={"Authentication"},
 *      summary="Registrar nuevo usuario",
 *      description="Crea una nueva cuenta de usuario",
 *      @OA\RequestBody(
 *          required=true,
 *          description="Datos del usuario",
 *          @OA\JsonContent(
 *              required={"name","email","password","password_confirmation","discipline_id"},
 *              @OA\Property(property="name", type="string", example="John Doe"),
 *              @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *              @OA\Property(property="password", type="string", format="password", example="password123"),
 *              @OA\Property(property="password_confirmation", type="string", format="password", example="password123"),
 *              @OA\Property(property="discipline_id", type="integer", example=1)
 *          ),
 *      ),
 *      @OA\Response(
 *          response=201,
 *          description="Usuario registrado exitosamente",
 *          @OA\JsonContent(
 *              @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..."),
 *              @OA\Property(property="token_type", type="string", example="Bearer"),
 *              @OA\Property(property="expires_at", type="string", format="date-time", example="2023-12-31T23:59:59Z"),
 *              @OA\Property(property="user", ref="#/components/schemas/User")
 *          )
 *      ),
 *      @OA\Response(
 *          response=422,
 *          description="Error de validación",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="The given data was invalid."),
 *              @OA\Property(property="errors", type="object")
 *          )
 *      )
 * )
 */

class AuthController extends Controller{

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
        $token = $tokenResult->accessToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_at' => now()->addDays(15)->toISOString(),
        ], 201);
    }

    /**
 * @OA\Post(
 *      path="/api/v1/login",
 *      operationId="login",
 *      tags={"Authentication"},
 *      summary="Iniciar sesión",
 *      description="Autentica un usuario y devuelve token de acceso",
 *      @OA\RequestBody(
 *          required=true,
 *          description="Credenciales de usuario",
 *          @OA\JsonContent(
 *              required={"email","password"},
 *              @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *              @OA\Property(property="password", type="string", format="password", example="password123")
 *          ),
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Login exitoso",
 *          @OA\JsonContent(
 *              @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..."),
 *              @OA\Property(property="token_type", type="string", example="Bearer"),
 *              @OA\Property(property="expires_at", type="string", format="date-time"),
 *              @OA\Property(property="user", ref="#/components/schemas/User")
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Credenciales inválidas"
 *      )
 * )
 */

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
        $token = $tokenResult->accessToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_at' => now()->addDays(15)->toISOString(),
        ]);
    }

    public function logout(Request $request): JsonResponse{
        $request->user()->tokens()->delete();
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function me(Request $request): JsonResponse{
        $user = $request->user();       
        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }
        
        return response()->json($user);
    }
}
?>