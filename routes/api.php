<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::options('{any}');

Route::post('/register', 'AuthController@register');

Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');

Route::middleware(['jwt.auth'])->group(function () {
  Route::apiResources([
      'todos' => 'TodoController',
      'users' => 'UserController',
      'settings' => 'SettingController'
  ]);
  //Route::post('/settings', 'SettingController@assignUser');
  Route::post('/todos/assign/user', 'TodoController@assignUser');
});
