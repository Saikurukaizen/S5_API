<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommunityResource extends JsonResource{
    
    public function toArray(Request $request): array{
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'discipline_id' => $this->discipline_id,
            'user_id' => $this->user_id,
            'discipline' => $this->whenLoaded('discipline'),
            'moderator' => $this->whenLoaded('user'),
            'users_count' => $this->whenLoaded('members', function() {
                return $this->members->count();
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}