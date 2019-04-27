<?php

namespace App\Http\Controllers;

use App\Models\Photos;
use Illuminate\Http\Request;
use Symfony\Component\VarDumper\VarDumper;

class PhotosController extends Controller
{
    function getPhotoById(Request $request, $id)
    {
        try {
            $photo = Photos::where('id', '=', $id)->first();
            if ($photo) {
                return response()->json([$photo], 201);
            } else {
                return response()->json("photo not found", 500);
            }
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json("error db photo not found", 500);
        }
    }
    function getPhotos(Request $request)
    {

        if ($request->isJson()) {
            return response()->json([Photos::all()], 200);
        } else {
            return response()->json(['Error, exit get'], 500);
        }
    }

    function getPhotosAndCommentsByUserId($id){
    
            $userId=User::where('id', '=',$id)->first();
            if($userId){
                $data = App\Post::user($id)->with('photos');
                var_dump($data);die;
            }
        
    }
    
    function createPhotos(Request $request)
    {

        if ($request->isJson()) {
            $data = $request->json()->all();
            $photo = new Photos();

            $photo->id_user = $data['user_id'];
            $photo->date = $data['date'];
            if (isset($data['url_photo'])) {
                $photo->url_photo = $data['url_photo'];
                echo ('entro en el url_photo');
            } else {
                $photo->path_photo = $data['path_photo'];
                echo ('entro en el path_photo');
            }
            $photo->save();
            return response()->json([$photo], 201);
        } else {
            return response()->json(['Error, exit post'], 500);
        }
    }

    function updatePhotos(Request $request, $id)
    {
        try {
            $photo = Photos::find($id);
            if (!($request->input('url_photo') === null)) {
                $photo->url_photo = $request->input('url_photo');
            }
            if (!($request->input('path_photo') === null)) {
                $photo->path_photo = $request->input('path_photo');
            }
            $photo->date = $request->input('date');
            $photo->save();
            return response()->json([$photo], 201);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json("error db photo not found", 500);
        }
    }

    function deletePhotos(Request $request, $id)
    {
            try {
                $photo = Photos::find($id);
                if ($photo) {
                    $photo->delete();
                    return response()->json([$photo], 201);
                } else {
                    return response()->json("photo not found", 500);
                }
            } catch (\Illuminate\Database\QueryException $ex) {
                return response()->json("error db photo not found", 500);
            }
    }
}
