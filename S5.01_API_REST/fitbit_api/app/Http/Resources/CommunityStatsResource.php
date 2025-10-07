<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ControllerStatsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'total_communities' => $this->total_communities ?? 0,
            'total_users' => $this->total_users ?? 0,
            'most_active_community' => $this->most_active_community ?? null,
            'ranking' => $this->ranking ?? [],
            'percentages' => $this->percentages ?? [],
            'monthly_activity' => $this->monthly_activity ?? [],
        ];
    }
}
