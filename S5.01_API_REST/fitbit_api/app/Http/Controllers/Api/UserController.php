<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller{

    protected function validateData($request): array{
        return $request->validate([
            'name' => 'required|string|max:150',
            'lastname' => 'required|string|max:150',
            'dqte_of_birth' => 'required|date',
            'email' => 'required|email|unique:users,email, ' . ($request->id ?? 'NULL') . ',id',
            'password' => ($request->isMethod('post') ? 'required|' : 'nullable|') . 'confirmed|min:6',
            'bank_acc' => 'required|string|unique:users,bank_acc, ' . ($request->id ?? 'NULL') . ',id',
            'discipline_id' => 'nullable|exists:disciplines,id',
        ]);
    }

    public function index(){
        $users = User::all();
        return response()->json([
            'data' => $users
        ], 200);
    }

    public function show($id){
        $user = User::findOrFail($id);
        return response()->json([
            'data' => $user
        ], 200);
    }

    public function store(Request $request){
        $data = $this->validateData($request);
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }

        $user = User::create([$data]);
        return response()->json([
            'message' => 'User created succesfully',
            'data' => $user
        ], 201);
    }

    public function update(Request $request, $id){
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

    public function destroy($id){
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'message' => 'User deleted succesfully'
        ], 200);
    }

}

?>