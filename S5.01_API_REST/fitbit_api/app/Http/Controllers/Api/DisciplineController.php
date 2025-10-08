<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Discipline;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Tag(
 *     name="Disciplines",
 *     description="Operaciones relacionadas con disciplinas"
 * )
 */
class DisciplineController extends Controller{

    protected function validateData(Request $request): array{
        return $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
        ]);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/disciplines",
     *      operationId="getDisciplines",
     *      tags={"Disciplines"},
     *      summary="Obtener lista de disciplinas",
     *      description="Devuelve todas las disciplinas disponibles (acceso público)",
     *      @OA\Response(
     *          response=200,
     *          description="Lista de disciplinas obtenida exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="data",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/Discipline")
     *              )
     *          )
     *      )
     * )
     */
    public function index(): JsonResponse{
        $disciplines = Discipline::all();

        return response()->json([
            'data' => $disciplines
        ], 200);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/disciplines/{id}",
     *      operationId="showDiscipline",
     *      tags={"Disciplines"},
     *      summary="Obtener disciplina específica",
     *      description="Devuelve una disciplina específica por ID (acceso público)",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID de la disciplina",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Disciplina encontrada",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="data",
     *                  ref="#/components/schemas/Discipline"
     *              )
     *          )
     *      ),
     *      @OA\Response(response=404, description="Disciplina no encontrada")
     * )
     */
    public function show(int $id): JsonResponse{
        $discipline = Discipline::findOrFail($id);

        return response()->json([
            'data' => $discipline
        ], 200);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/disciplines",
     *      operationId="storeDiscipline",
     *      tags={"Disciplines"},
     *      summary="Crear nueva disciplina",
     *      description="Crea una nueva disciplina (solo administradores)",
     *      security={{"bearer_token":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos de la disciplina",
     *          @OA\JsonContent(
     *              required={"name"},
     *              @OA\Property(property="name", type="string", maxLength=150, example="Boxing"),
     *              @OA\Property(property="description", type="string", nullable=true, example="Arte marcial de combate con puños")
     *          )
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Disciplina creada exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Discipline created successfully"),
     *              @OA\Property(property="data", ref="#/components/schemas/Discipline")
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos de administrador"),
     *      @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function store(Request $request): JsonResponse{
        $data = $this->validateData($request);
        $discipline = Discipline::create($data);

        return response()->json([
            'message' => 'Discipline created succesfully',
            'data' => $discipline
        ], 201);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/disciplines/{id}",
     *      operationId="updateDiscipline",
     *      tags={"Disciplines"},
     *      summary="Actualizar disciplina",
     *      description="Actualiza una disciplina existente (solo administradores)",
     *      security={{"bearer_token":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID de la disciplina",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos actualizados de la disciplina",
     *          @OA\JsonContent(
     *              required={"name"},
     *              @OA\Property(property="name", type="string", maxLength=150, example="Boxing Updated"),
     *              @OA\Property(property="description", type="string", nullable=true, example="Descripción actualizada")
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Disciplina actualizada exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Discipline updated successfully"),
     *              @OA\Property(property="data", ref="#/components/schemas/Discipline")
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos"),
     *      @OA\Response(response=404, description="Disciplina no encontrada"),
     *      @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function update(Request $request, $id): JsonResponse{
        $data = $this->validateData($request);
        $discipline = Discipline::findOrFail($id);
        $discipline->update($data);

        return response()->json([
            'message' => 'Discipline updated succesfully',
            'data' => $discipline
        ], 200);
    }
    
    /**
     * @OA\Delete(
     *      path="/api/v1/disciplines/{id}",
     *      operationId="destroyDiscipline",
     *      tags={"Disciplines"},
     *      summary="Eliminar disciplina",
     *      description="Elimina una disciplina existente (solo administradores)",
     *      security={{"bearer_token":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID de la disciplina",
     *          @OA\Schema(type="integer", example=1)
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Disciplina eliminada exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Discipline deleted successfully")
     *          )
     *      ),
     *      @OA\Response(response=401, description="No autorizado"),
     *      @OA\Response(response=403, description="Sin permisos"),
     *      @OA\Response(response=404, description="Disciplina no encontrada")
     * )
     */
    public function destroy($id): JsonResponse{
        $discipline = Discipline::findOrFail($id);
        $discipline->delete();
        
        return response()->json([
            'message' => 'Discipline deleted succesfully'
        ], 200);
    }
}
?>