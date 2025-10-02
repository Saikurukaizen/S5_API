<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        return $this->belongsToMany(User::class, 'community_user', 'community_id', 'user_id')
            ->withTimestamps();
    }
}
