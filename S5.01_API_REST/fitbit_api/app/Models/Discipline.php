<?php

namespace App\Models;

use App\Models\User;
use App\Models\Community;
use Illuminate\Database\Eloquent\Model;

class Discipline extends Model
{
    protected $fillable = ['name', 'description'];

    public function users(){
        return $this->belongsToMany(User::class);
    }

    public function community(){
        return $this->belongsTo(Community::class);
    }
}
