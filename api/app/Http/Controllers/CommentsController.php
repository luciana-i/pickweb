<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Symfony\Component\VarDumper\VarDumper;
use App\Models\Photos;
use App\User;
use App\Http\Controllers\Response;
use DB;

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

      function getCommentsByPhotoId($id){
        $userId = DB::table('photos')->find($id);
        if($userId){
          $query=DB::select("SELECT c.id, c.description, u.name, c.date, u.photo, u.id as usr_id FROM comments c INNER JOIN users u on c.user_id=u.id WHERE c.photo_id= ? ORDER BY c.date DESC", [$id]);
          return response()->json([$query],200);
        }
    }
    function createCommentsByPhotoId(Request $request, $id){
      if ($request->isJson()) {
        $data = $request->json()->all();
       // var_dump($id);die;
        $descripcion=$data['description'];
        $photo_id=$data['photo_id'];
        $fecha=date("Y-m-d H:i:s");
        $id+0;
        $query =  DB::insert('insert into comments (photo_id, description, date,user_id)  values (?,?,?,?)', [$photo_id, $descripcion,$fecha, $id]);
       
        return response()->json([$query], 201);
    } else {
        return response()->json(['Error, exit post'], 500);
    }
    }/*
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
    }*/
    function updateComments(Request $request,$id)
    {
            try {
           //q   var_dump($comment = Comments::find($id));die;
              
               $comment = Comments::find($id);
                if ($comment) {
            //      var_dump($request->input('date'));die;
                    $comment->description = $request->input('description');
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
