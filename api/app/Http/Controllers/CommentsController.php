<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Symfony\Component\VarDumper\VarDumper;

class CommentsController extends Controller
{
    function getComments(Request $request)
    {
        if ($request->isJson()) {
            return response()->json([Comments::all()], 200);
        } else {
            return response()->json(['Error, exit get'], 500);
        }
    }
   
    function getCommentsById (Request $request, $id){
   
        if ($request->isJson()){
          $data= $request->json()->all();
          try{
            $comments= Comments::where('id', '=', $id)->first();
            if($comments){
              return response()->json([$comments],201);
            }else{
              return response()->json("comments not found",500);
            }
          }catch(\Illuminate\Database\QueryException $ex){
            return response()->json("error db comments not found", 500);
          }
        }else{
          return response()->json(['Error, exit patch'],500);
        }      
      }
    function createComments(Request $request)
    {
        if ($request->isJson()) {
            $data = $request->json()->all();
            $comment = new Comments();
            $comment->id_user = $data['user_id'];
            $comment->date = $data['date'];
            $comment->description = $data['description'];
            $comment->id_photo = $data['photo_id'];
            $comment->dest_id_usr = $data['dest_id_usr'];
            $comment->save();
            return response()->json([$comment], 201);
        } else {
            return response()->json(['Error, exit post'], 500);
        }
    }
    function updateComments(Request $request,$id)
    {
            try {
                $comment = Comments::find($id);
                if ($comment) {
                    $comment->id_user = $request->input('user_id');
                    $comment->description = $request->input('description');
                    $comment->id_photo = $request->input('photo_id');
                    $comment->dest_id_usr = $request->input('dest_id_usr');
                    $comment->date = $request->input('date');
                    $comment->save();

                    return response()->json([$comment], 201);
                }else{
                    return response()->json("error db comment not found", 500);
                }
            } catch (\Illuminate\Database\QueryException $ex) {
                return response()->json("error db comment not found", 500);
            }
         
    }
    function deleteComments(Request $request, $id)
    {
            try {
                $comment = Comments::find($id);
                if ($comment) {
                    $comment->delete();
                    return response()->json([$comment], 201);
                } else {
                    return response()->json("comment not found", 500);
                }
            } catch (\Illuminate\Database\QueryException $ex) {
                return response()->json("error db comment not found", 500);
            }
        } 
}
