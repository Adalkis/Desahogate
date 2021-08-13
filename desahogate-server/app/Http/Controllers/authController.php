<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class authController extends Controller
{
    public function register(Request $request){
        $user= new User();
        $user->name=$request->input('name');
        $user->lastname=$request->input('lastname');
        $user->email=$request->input('email');
        $user->password=Hash::make($request->input('password'));
        $user->save();

        return response()->json($user);
    }
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        if(Auth::attempt($credentials)){
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $minutes= 60 * 24;
            $cookie= Cookie::make('jwt', "$token", $minutes);
            return response()->json([
                'message'=>$token
            ])->withCookie($cookie);
        }
        else{
            return 'Login credentials are not valid';
        }

    }
    public function authenticatedUser(){
        return Auth::user();
    }

    public function logout(Request $request){
        $cookie= Cookie::forget('jwt');
        return response()->json([
            'message' => 'success'
        ])->withCookie($cookie);
    }
}
