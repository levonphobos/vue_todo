<?php

namespace App\Http\Controllers;
use App\Http\Resources\UserCollection;
use App\Http\Resources\User as UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return new UserCollection(User::all()->sortByDesc('id'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $userData = [
        'email'    => $request->email,
        'name'    => $request->name,
        'password' => $request->password,
      ];
      $file_data = $request->avatar;
      preg_match("/data:image\/(.*?);/",$file_data,$image_extension); // extract the image extension
      $file_data = preg_replace('/data:image\/(.*?);base64,/','',$file_data); // remove the type part
      $image = str_replace(' ', '+', $file_data);

      if($image_extension && in_array($image_extension[1], ['jpg', 'jpeg', 'png'])){
        $avatar = 'avatars/image_' . time() . '.' . $image_extension[1];
        if ($file_data != "") {
          Storage::disk('uploads')->put($avatar, base64_decode($file_data));
        }
        $userData['avatar'] = $avatar;
      }

      $user = User::create($userData);
      return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new UserResource(User::find($id));
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
      $user = User::findOrFail($id);

      $userData = [
        'email'    => $request->email,
        'name'    => $request->name,
        'password' => $request->password,
      ];
      if($request->avatar){
        $file_data = $request->avatar;
        preg_match("/data:image\/(.*?);/",$file_data,$image_extension); // extract the image extension
        $file_data = preg_replace('/data:image\/(.*?);base64,/','',$file_data); // remove the type part
        $image = str_replace(' ', '+', $file_data);

        if($image_extension && in_array($image_extension[1], ['jpg', 'jpeg', 'png'])){
          $avatar = 'avatars/image_' . time() . '.' . $image_extension[1];
          //dd($avatar);
          if ($file_data != "") {
            Storage::disk('uploads')->delete($user->avatar);
            Storage::disk('uploads')->put($avatar, base64_decode($file_data));
          }
          $userData['avatar'] = $avatar;
        }
      }

      $user->update($userData);
      return (new UserResource($user))->response()->setStatusCode(202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $user = User::findOrFail($id);
      Storage::disk('uploads')->delete($user->avatar);
      $user->forceDelete();
      return new UserResource($user);
    }
}
