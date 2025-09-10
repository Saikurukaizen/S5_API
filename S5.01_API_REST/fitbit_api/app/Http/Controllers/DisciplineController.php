<?php

namespace App\Http\Controllers;

use App\Models\Discipline;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DisciplineController extends Controller
{

    protected $jsonPath = 'api/disciplines';

    public function __construct(){
        $this->middleware('auth:api');
    }

    public function index(){
        $disciplines = $this->jsonPath;
        return response()->json($disciplines);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:disciplines,name',
            'description' => 'required|string|max:150',
        ]);

        $discipline = $this->readJson();
        $validated['id'] = count($disciplines) + 1;
        $disciplines[] = $validated;
        $this->writeJson($disciplines);

        return response()->json($discipline, Response::HTTP_CREATED);
    }

    public function show(Discipline $discipline){
        return response()->json($discipline);
    }

    public function update(Request $request, Discipline $discipline){
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:disciplines,name',
            'description' => 'required|string|max:150',
        ]);

        $discipline->update($validated);

        return response()->json($discipline);
    }

    public function destroy(Discipline $discipline){
        $discipline->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
