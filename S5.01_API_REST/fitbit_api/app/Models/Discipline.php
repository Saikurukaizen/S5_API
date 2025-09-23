<?php

namespace App\Models;

use App\Models\User;
use App\Models\Community;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discipline extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];

    public function users(){
        return $this->hasMany(User::class);
    }

    public function communities(){
        return $this->hasMany(Community::class);
    }
}
