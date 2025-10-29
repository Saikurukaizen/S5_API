<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Community;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Users",
 *     description="Operaciones relacionadas con usuarios"
 * )
 */
class UserController extends Controller{

    protected function validateData($request): array{
        return $request->validate([
            'name' => 'required|string|max:150',
            'lastname' => 'required|string|max:150',
            'date_of_birth' => 'required|date',
            'email' => 'required|email|unique:users,email, ' . ($request->id ?? 'NULL') . ',id',
            'password' => ($request->isMethod('post') ? 'required|' : 'nullable|') . 'confirmed|min:6',
            'bank_acc' => 'required|string|unique:users,bank_acc, ' . ($request->id ?? 'NULL') . ',id',
            'discipline_id' => 'nullable|exists:disciplines,id',
        ]);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/users",
     *      operationId="getUsers",
     *      tags={"Users"},
     *      summary="Obtener lista de usuarios",
     *      description="Devuelve todos los usuarios (solo admin/moderador)",
     *      security={{"bearer_token":{}}},
     *      @OA\Response(
     *          response=200,
     *          description="Lista de usuarios obtenida exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="data",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/User")
     *              )
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos")
     * )
     */
    public function index(): JsonResponse{
        $users = User::all();

        return response()->json([
            'data' => $users
        ], 200);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/users/{id}",
     *      operationId="showUser",
     *      tags={"Users"},
     *      summary="Obtener usuario específico",
     *      description="Devuelve un usuario específico por ID",
     *      security={{"bearer_token":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID del usuario",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Usuario encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/components/schemas/User"
     *              )
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=404, description="Usuario no encontrado")
     * )
     */
    public function show($id): JsonResponse{
        $user = User::findOrFail($id);

        return response()->json([
            'data' => $user
        ], 200);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/users",
     *      operationId="storeUser",
     *      tags={"Users"},
     *      summary="Crear nuevo usuario",
     *      description="Crea un nuevo usuario (solo admin/moderador)",
     *      security={{"bearer_token":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos del usuario",
     *          @OA\JsonContent(
     *              required={"name","lastname","date_of_birth","email","password","password_confirmation","bank_acc"},
     *              @OA\Property(property="name", type="string", maxLength=150, example="John"),
     *              @OA\Property(property="lastname", type="string", maxLength=150, example="Doe"),
     *              @OA\Property(property="date_of_birth", type="string", format="date", example="1990-01-01"),
     *              @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *              @OA\Property(property="password", type="string", minLength=6, example="password123"),
     *              @OA\Property(property="password_confirmation", type="string", example="password123"),
     *              @OA\Property(property="bank_acc", type="string", example="1234567890"),
     *              @OA\Property(property="discipline_id", type="integer", nullable=true, example=1)
     *          )
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Usuario creado exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="User created successfully"),
     *              @OA\Property(property="data", ref="#/components/schemas/User")
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos"),
     *      @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function store(Request $request): JsonResponse{
        $data = $this->validateData($request);
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }

        $user = User::create($data);

        return response()->json([
            'message' => 'User created succesfully',
            'data' => $user
        ], 201);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/users/{id}",
     *      operationId="updateUser",
     *      tags={"Users"},
     *      summary="Actualizar usuario",
     *      description="Actualiza un usuario existente (solo admin/moderador)",
     *      security={{"bearer_token":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID del usuario",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos actualizados del usuario",
     *          @OA\JsonContent(
     *              required={"name","lastname","date_of_birth","email","bank_acc"},
     *              @OA\Property(property="name", type="string", maxLength=150, example="John Updated"),
     *              @OA\Property(property="lastname", type="string", maxLength=150, example="Doe Updated"),
     *              @OA\Property(property="date_of_birth", type="string", format="date", example="1990-01-01"),
     *              @OA\Property(property="email", type="string", format="email", example="john.updated@example.com"),
     *              @OA\Property(property="password", type="string", minLength=6, nullable=true, example="newpassword123"),
     *              @OA\Property(property="password_confirmation", type="string", nullable=true, example="newpassword123"),
     *              @OA\Property(property="bank_acc", type="string", example="9876543210"),
     *              @OA\Property(property="discipline_id", type="integer", nullable=true, example=2)
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Usuario actualizado exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="User updated successfully"),
     *              @OA\Property(property="data", ref="#/components/schemas/User")
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos"),
     *      @OA\Response(response=404, description="Usuario no encontrado"),
     *      @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function update(Request $request, $id): JsonResponse{
        $data = $this->validateData($request);
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }

        $user = User::findOrFail($id);
        $user->update($data);
        
        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    /**
     * @OA\Delete(
     *      path="/api/v1/users/{id}",
     *      operationId="destroyUser",
     *      tags={"Users"},
     *      summary="Eliminar usuario",
     *      description="Elimina un usuario existente (solo administradores)",
     *      security={{"bearer_token":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID del usuario",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Usuario eliminado exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="User deleted successfully")
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos de administrador"),
     *      @OA\Response(response=404, description="Usuario no encontrado")
     * )
     */
    public function destroy($id): JsonResponse{
        $user = User::findOrFail($id);
        $user->delete();
        
        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }

    public function changeDiscipline(Request $request, $id): JsonResponse{
        $request->validate([
            'discipline_id' => 'nullable|exists:disciplines,id',
        ]);

        $user = User::findOrFail($id);
        $user->discipline_id = $request->input('discipline_id');
        $user->save();

        return response()->json([
            'message' => 'Discipline updated successfully',
            'data' => $user
        ], 200);
    }

    public function joinCommunity(Request $request, $id): JsonResponse{
        $user = User::findOrFail($id);
        $communityId = $request->input('community_id');
        $community = Community::findOrFail($communityId);

        if(!$user->discipline_id){
            return response()->json([
                'message' => 'User doesn\'t have a discipline to join a community'
            ], 422);
        }

        if($community->discipline_id !== $user->discipline_id){
            return response()->json([
                'message' => 'User\'s discipline does not match community\'s discipline'
            ], 422);
        }

        $user->community_id = $communityId;
        $user->save();

        return response()->json([
            'message' => 'User joined community successfully',
            'data' => $user
        ], 200);
    }

    public function leaveCommunity($id): JsonResponse{
        $user = User::findOrFail($id);
        $user->community_id = null;
        $user->save();

        return response()->json([
            'message' => 'User left community successfully',
            'data' => $user
        ], 200);
    }

}

?>