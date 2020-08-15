<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TodoUser extends Model
{
  protected $table = 'todo_users';

  protected $fillable = ['user_id', 'todo_id'];
}
