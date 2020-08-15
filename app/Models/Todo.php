<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    //
    protected $table = 'todos';

    protected $attributes = [
        'title'       => '',
        'status'      => 0,
        'description' => ''
    ];

    protected $fillable = ['title', 'description', 'status'];

    public function assignedUsers()
    {
        return $this->belongsToMany('App\User', 'todo_users');
        //return $this->belongsToMany('App\User', 'todo_users', 'user_id', 'todo_id');
    }
}
