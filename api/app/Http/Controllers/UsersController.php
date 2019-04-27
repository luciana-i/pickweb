<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\VarDumper\VarDumper;
use Illuminate\Auth\Access\Response;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

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

  /*
  function getUserById(Request $request){
    if ($request->isJson()){
      $data= $request->json()->all();
      try{
        $id=$data['id'];
        $user= User::where('id','=',$id)->first();
        if($user){
          return response()->json([$user],201);
        }else{
          return response()->json("user not found",500);
        }
      }catch(\Illuminate\Database\QueryException $ex){
        return response()->json("error db user not found", 500);
      }
    }else{
      return response()->json(['Error, exit getUserById'],500);
    }      
  }*/
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
  function prueba(Request $request){
   
   echo ("entro");
}    

  function updateUser(Request $request, $id){
   
    $user= User::find($id);

    $user->name=$request->input('name');
    $user->lastName=$request->input('lastName');
    $user->rol=$request->input('rol');
    if (!($request->input('photo')===null)){
      $user->photo=$request->input('photo');
    }
    $user->mail=$request->input('mail');
    $user->password = Hash::make($request->input('password'));
    $user->save();
    return response()->json($user);
  }
/*
  function updateUser(Request $request)
  {
    if ($request->isJson()) {
      $data = $request->json()->all();
      // var_dump($data);
      try {
        $user = User::find($data['id']);
        if ($user) {
          $user->name = $data['name'];
          $user->lastName = $data['lastName'];
          $user->rol = $data['rol'];
          if (isset($data['photo'])) {
            if (move_uploaded_file($data['photo'], $path + $data['photo'])) {
              $user->photo = $path + $data['photo'];
              echo ('se pudo mover el archivo');
            } else {
              echo ('no se pudo mover el archivo');
            }
            echo ("entro en isset photo");
          } else {
            echo ("entro el el else del isset photo");
          }
          $user->mail = $data['mail'];
          $user->password = Hash::make($data['password']);
          $user->save();
          return response()->json([$user], 201);
        } else {
          return response()->json("user not found", 500);
        }
      } catch (\Illuminate\Database\QueryException $ex) {
        return response()->json("error db user not found", 500);
      }
    } else {
      return response()->json(['Error, exit patch'], 500);
    }
  }
  */

  function deleteUser(Request $request,$id)
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



  // public function saveFile()
  // {
  //   $file = Request::file('file');
  //   Storage::put($file->getClientOriginalName(), File::get($file));
  //   return response()->json(‘success’);
  // }
  // public function deleteFile($name)
  // {
  //   Storage::delete($name);
  //   return response()->json(‘success’);
  // }
  // public function getFileList()
  // {
  //   $files = Storage::files(‘ / ’);
  //   return response()->json($files);
  // }
  // public function viewFile($name)
  // {
  //   $path = storage_path() . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . $name;
  //   return response()->make(file_get_contents($path), 200, [
  //     ‘Content - Type’ => Storage::mimeType($name),
  //     ‘Content - Disposition’ => 'inline; '. $name,]);
  // }
}
