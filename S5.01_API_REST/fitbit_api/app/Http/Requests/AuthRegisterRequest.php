<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRegisterRequest extends FormRequest{

    public function authorize(): bool{
        return true;
    }

    public function rules(): array{
        return [
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'bank_acc' => 'nullable|string|max:255',
            'discipline_id' => 'nullable|exists:disciplines,id',
        ];
    }
}
?>