<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DisciplineStatsResource extends JsonResource{

    public function toArray(Request $request): array{
        return [
            'total_disciplines' => $this->total_disciplines ?? 0,
            'total_users' => $this->total_users ?? 0,
            'most_popular_discipline' => $this->most_popular_discipline ?? null,
            'ranking' => $this->ranking ?? [],
            'percentages' => $this->percentages ?? [],
            'monthly_activity' => $this->monthly_activity ?? [],
        ];
    }
}
