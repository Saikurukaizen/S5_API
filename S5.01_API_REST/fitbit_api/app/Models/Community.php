<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *      schema="Community",
 *      type="object",
 *      title="Community",
 *      description="Community model",
 *      @OA\Property(property="id", type="integer", format="int64", example=1),
 *      @OA\Property(property="name", type="string", example="Community Name"),
 *      @OA\Property(property="description", type="string", example="Community description"),
 *      @OA\Property(property="discipline_id", type="integer", example=1),
 *      @OA\Property(property="user_id", type="integer", example=1),
 *      @OA\Property(property="created_at", type="string", format="date-time"),
 *      @OA\Property(property="updated_at", type="string", format="date-time"),
 *      @OA\Property(property="discipline", ref="#/components/schemas/Discipline"),
 *      @OA\Property(property="user", ref="#/components/schemas/User")
 * )
 */

class Community extends Model{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'discipline_id',
        'user_id',
    ];

    public function discipline(){
        return $this->belongsTo(Discipline::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function members(){
        return $this->belongsToMany(User::class, 'community_user');
    }
}
