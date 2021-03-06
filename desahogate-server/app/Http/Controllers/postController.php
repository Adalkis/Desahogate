<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;


use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Comments;

class postController extends Controller
{
    public function getData(){
        $data =Post::with('comments')->with("users")->orderBy('created_at', 'DESC')->get();
        return $data;

       
       
    }


   public function postData(Request $request){
       $post = new Post();
       $post->post_name=$request->input('post_name');
       $post->user_id=Auth::id();
       $post->save();
       return $post;
   }

   public function postComment(Request $request){
       $comment = new Comments();
       $comment->username=Auth::user()->name;
       $comment->comment=$request->input('comment');
       $comment->post_id=$request->input('post_id');
       $comment->user_id=Auth::id();
       $comment->save();
       return $comment;
   }

   


    
}
