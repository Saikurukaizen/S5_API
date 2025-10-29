<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->route('id');
        return [
            'name' => 'sometimes|string|max:255',
            'lastname' => 'sometimes|string|max:255',
            'date_of_birth' => 'sometimes|date',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'nullable|confirmed|min:6',
            'bank_acc' => 'sometimes|string|unique:users,bank_acc,' . $id,
        ];
    }
}
