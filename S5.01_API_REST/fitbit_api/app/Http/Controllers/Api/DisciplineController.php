<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Discipline;
use Illuminate\Http\Request;

class DisciplineController extends Controller{

    protected function validateData(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
        ]);
    }

    public function index(){

        $disciplines = Discipline::all();
        return response()->json([
            'data' => $disciplines
        ], 200);
    }

    public function show($id){

        $discipline = Discipline::findOrFail($id);
        return response()->json([
            'data' => $discipline
        ], 200);
    }

    public function store(Request $request){

        $data = $this->validateData($request);
        $discipline = Discipline::create($data);
        return response()->json([
            'message' => 'Discipline created succesfully',
            'data' => $discipline
        ], 201);
    }

    public function update(Request $request){

        $data = $this->validateData($request);
        $discipline = Discipline::findOrFail($request->id);
        $discipline->update($data);
        return response()->json([
            'message' => 'Discipline updated succesfully',
            'data' => $discipline
        ], 200);
    }
    
    public function destroy($id){

        $discipline = Discipline::findOrFail($id);
        $discipline->delete();
        return response()->json([
            'message' => 'Discipline deleted succesfully'
        ], 200);
    }
}
?>