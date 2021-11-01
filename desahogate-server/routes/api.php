<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\postController;
use App\Models\Post;
use App\Models\Comments;
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
Route::middleware('api')->group(function(){
    Route::post('login',[authController::class,'login']);
    Route::post('register',[authController::class,'register']);
    Route::get('post',[postController::class, 'getData']);
       // Route::get('comment',[postController::class, 'getComment']);
    // Route::get('post', function() { return Post::with('Comments')->get(); } );
   
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('user',[authController::class,'authenticatedUser']);
    Route::post('logout',[authController::class,'logout']);
    Route::post('post',[postController::class, 'postData']);
    Route::post('comment',[postController::class, 'postComment']);
});

