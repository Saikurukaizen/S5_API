<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'lastname' => $this->lastname,
            'date_of_birth' => $this->date_of_birth,
            'email' => $this->email,
            'bank_acc' => $this->bank_acc,
            'discipline_id' => $this->discipline_id,
            // ...otros campos
        ];
    }
}
