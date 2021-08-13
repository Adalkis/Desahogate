<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comments;
use App\Models\User;

class Post extends Model
{
    use HasFactory;

    public function comments(){
        return $this->hasMany(Comments::class);
    }
    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
