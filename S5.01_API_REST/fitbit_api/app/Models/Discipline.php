<?php

namespace App\Models;

use App\Models\User;
use App\Models\Community;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Discipline",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Boxing"),
 *     @OA\Property(property="description", type="string", example="Arte marcial de combate"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class Discipline extends Model{

    use HasFactory;
    
    protected $fillable = [
        'name', 'description'
    ];

    public function users(){
        return $this->hasMany(User::class);
    }

    public function communities(){
        return $this->hasMany(Community::class);
    }
}
