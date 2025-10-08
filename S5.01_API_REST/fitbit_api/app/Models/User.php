<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

/**
 * @OA\Schema(
 *      schema="User",
 *      type="object",
 *      title="User",
 *      description="User model",
 *      @OA\Property(property="id", type="integer", format="int64", example=1),
 *      @OA\Property(property="name", type="string", example="John Doe"),
 *      @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *      @OA\Property(property="role", type="string", enum={"user", "moderator", "admin"}, example="user"),
 *      @OA\Property(property="discipline_id", type="integer", example=1),
 *      @OA\Property(property="created_at", type="string", format="date-time"),
 *      @OA\Property(property="updated_at", type="string", format="date-time"),
 *      @OA\Property(property="discipline", ref="#/components/schemas/Discipline")
 * )
 */

class User extends Authenticatable{

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'lastname',
        'email',
        'password',
        'role',
        'date_of_birth',
        'bank_acc',
        'discipline_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array{
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function discipline(){
        return $this->belongsTo(Discipline::class);
    }

    public function communities(){
        return $this->belongsToMany(Community::class, 'community_user');
    }

    protected static function newFactory(){
        return UserFactory::new();
    }
}
