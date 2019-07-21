<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photos;
use App\User;
use App\Http\Controllers\Response;
use Symfony\Component\VarDumper\VarDumper;
use DB;

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
            print_r($request);
            die;
            return response()->json(['Error, exit get'], 500);
        }
    }
    function getPhotosFromTimeRange(Request $request)
    {
        try{
            $todayDate = date("Y-m-d H:i:s");
            $oldDate = date('Y-m-d H:i:s', strtotime('-2 week'));
            $query = DB::select("SELECT p.id, p.photo, p.date, u.name, u.id as usr_id FROM photos p INNER JOIN users u ON p.user_id=u.id WHERE p.date BETWEEN ? AND ?", [$oldDate, $todayDate]);
            return response()->json([$query], 200);
        }catch (\Illuminate\Database\QueryException $ex) {
            return response()->json("query no OK", 500);
        }
    }
    function getPhotosByUserId($id)
    {
        $userId = DB::table('users')->find($id);
        if ($userId) {
            $query = DB::select("SELECT p.id, p.photo, p.date, u.name, u.id as usr_id FROM `photos` p  INNER JOIN users u ON p.user_id=u.id WHERE user_id= ? ORDER BY `date` DESC", [$id]);
            return response()->json([$query], 200);
        } else {
            return response()->json("get no OK", 500);
        }
    }

    function createPhotos($id)
    {
        try {

            $filename = $_FILES['file']['name'];

            /* Location */

            $location = "../storage/resources/";

            /* Upload file */
            move_uploaded_file($_FILES['file']['tmp_name'], $location . $filename);

            $pathBD = "./api/storage/resources/";
            $arr = array("name" => $filename);
            echo json_encode($arr);

            $date = date("Y-m-d H:i:s");

            $query =  DB::insert('insert into photos (photo, user_id, date)  values (?,?,?)', [$pathBD . $filename, $id, $date]);
            if ($query)
                return response()->json("post OK", 200);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json("post no OK", 500);
        }
    }

    function updatePhotos($id)
    {
        if (Photos::find($id)) {

            $filename = $_FILES['file']['name'];

            /* Location */

            $location = "../storage/resources/";

            /* Upload file */
            move_uploaded_file($_FILES['file']['tmp_name'], $location . $filename);

            $pathBD = "./api/storage/resources/";

            $arr = array("name" => $filename);
            echo json_encode($arr);

            // $date = date("Y-m-d");

            $query =  DB::update('update photos set photo = ? where id = ?', [$pathBD . $filename, $id]);
            //  $query =  DB::update('update photos set photo = ?, date= ? where id = ?', [$pathBD . $filename, $date, $id]);


            if ($query) {
                return response()->json("patch OK", 200);
            } else {
                return response()->json("error patch", 500);
            }
        } else {
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
