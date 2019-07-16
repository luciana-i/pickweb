<?php

namespace App\Http\Controllers;

use App\Models\ApplicationStyle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;
use PHPUnit\Framework\Exception;

class ApplicationStyleController extends Controller
{

  function getBackground(Request $request)
  {
    return response()->json([ApplicationStyle::all()], 200);
  }

  function updateBackground(Request $request)
  {
      $applicationBackground = $request->input('background-color');
      var_dump($request->input('background-color'));die;
      $applicationBackground->save();
      if ($applicationBackground) {
        return response()->json("background color updated", 201);
      } else {
        return response()->json("error updating background color", 500);
      }
    } 
    function getBackgroundById(Request $request,$id)
    {
      try {
        $style = ApplicationStyle::where('id', '=', $id)->first();
        if ($style) {
          return response()->json([$style], 201);
        } else {
          return response()->json("style not found", 500);
        }
      } catch (\Illuminate\Database\QueryException $ex) {
        return response()->json("error db style not found", 500);
      }
      
    }
}
