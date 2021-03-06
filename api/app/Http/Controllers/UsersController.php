<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;
use PHPUnit\Framework\Exception;

class UsersController extends Controller
{
  public $path = '../../public/src';
  function getUser(Request $request)
  {
    return response()->json([User::all()], 200);
  }

  function getUserById(Request $request, $id)
  {

    try {
      $user = User::where('id', '=', $id)->first();
      if ($user) {
        return response()->json([$user], 201);
      } else {
        return response()->json("user not found", 500);
      }
    } catch (\Illuminate\Database\QueryException $ex) {
      return response()->json("error db user not found", 500);
    }
  }
  function createUser(Request $request)
  {

    if ($request->isJson()) {
      $data = $request->json()->all();
      $user = User::create([
        'name' => $data['name'],
        'lastName' => $data['lastName'],
        'rol' => "user",
        'photo' => "",
        'mail' => $data['mail'],
        'password' => Hash::make($data['password'])
      ]);
      return response()->json([$user], 201);
    } else {
      return response()->json(['Error, exit post'], 500);
    }
  }

  function updateUser(Request $request, $id)
  {

    $user = User::find($id);

    $user->name = $request->input('name');
    $user->lastName = $request->input('lastName');
    $user->rol = $request->input('rol');
    if (!($request->input('photo') === null)) {
      $user->photo = $request->input('photo');
    }
    $user->mail = $request->input('mail');
    $user->password = Hash::make($request->input('password'));
    $user->save();
    return response()->json($user);
  }
  function deleteUser(Request $request, $id)
  {
    try {
      $user = User::find($id);
      if ($user) {
        $user->delete();
        return response()->json([$user], 201);
      } else {
        return response()->json("user not found", 500);
      }
    } catch (\Illuminate\Database\QueryException $ex) {
      return response()->json("error db user not found", 500);
    }
  }

  function postPhoto($id)
  {
   
    $filename = $_FILES['file']['name'];
    
    /* Location */

    $location = "../storage/resources/";

    /* Upload file */
    move_uploaded_file($_FILES['file']['tmp_name'], $location . $filename);

    $pathBD="./api/storage/resources/";

    $arr = array("name" => $filename);
    echo json_encode($arr);

    $query =  DB::update('update users set photo = ? where id = ?', [$pathBD.$filename, $id]);
 
      
    if ($query) {
      return response()->json("patch OK", 200);
    } else {
      return response()->json("patch no OK", 500);
    }
  }

  function getUserFromPhoto($idUser){
    try{
      $query = DB::select("SELECT id FROM photos WHERE user_id = ?", [$idUser]);
      return response()->json([$query], 200);
    }catch(\Illuminate\Database\QueryException $ex){
      return response()->json("user no encontrado", 500);
    }
  }
}
