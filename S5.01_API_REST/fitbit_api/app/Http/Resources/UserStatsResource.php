<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserStatsResource extends JsonResource{

    public function toArray(Request $request): array{
        return [
            'total_users' => $this->total_users ?? 0,
            'total_disciplines' => $this->total_disciplines ?? 0,
            'most_active_user' => $this->most_active_user ?? null,
            'users' => $this->users ?? [],
        ];
    }
}
?>