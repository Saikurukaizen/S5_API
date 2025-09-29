<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Passport\HasApiTokens;
use Laravel\Passport\Passport;

class AuthController extends Controller{

    use HasApiTokens;

    public function register(Request $request){
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
        ]);

        $token = $user->createToken('/oauth/token')->accessToken;
        Passport::personalAccessTokensExpireIn(now()->addDays(15));

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');
        if(!Auth::attempt($credentials)){
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        Auth::user();
        $token = Auth::user()->createToken('auth_token')->accessToken;
        Passport::personalAccessTokensExpireIn(now()->addDays(15));

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }       
}
?>