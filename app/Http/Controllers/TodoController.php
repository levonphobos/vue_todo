<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Todo;
use App\Models\TodoUser;
use App\Http\Resources\TodoCollection;
use App\Http\Resources\Todo as TodoResource;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return new TodoCollection(
        Todo::with('assignedUsers')
          ->get()
          ->sortByDesc('id')
      );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $todo = Todo::create(['title' => $request->title, 'description' => $request->description]);
      return new TodoResource($todo);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      return Todo::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $todo = Todo::with('assignedUsers')->findOrFail($id);
      $todo->update($request->all());
      return (new TodoResource($todo))->response()->setStatusCode(202);
    }

    /**
     * Assign pivot the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function assignUser(Request $request){
      $todo = Todo::with('assignedUsers')->find($request->todoID);
      $todo->assignedUsers()->detach();
      foreach($request->users as $user){
        $todo->assignedUsers()->attach($user['id']);
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $todo = Todo::findOrFail($id);
      $todo->forceDelete();
      return new TodoResource($todo);
    }
}
