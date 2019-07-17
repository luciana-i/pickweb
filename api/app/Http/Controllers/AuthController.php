<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
use Symfony\Component\HttpFoundation\Session\Session;

class AuthController extends Controller
{
    /**
     * @var \Tymon\JWTAuth\JWTAuth
     */
    protected $jwt;

    

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
     //   $this->middleware('guest', ['except' => ['logout', 'getLogout']]);
    }

    public function postLogin(Request $request)
    {
        $this->validate($request, [
            'mail'    => 'required|email|max:255',
            'password' => 'required',
        ]);
        try {
         //   var_dump(($request->only('mail', 'password')));die;
            if (! $token = $this->jwt->attempt($request->only('mail', 'password'))) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], 500);

        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], 500);

        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent' => $e->getMessage()], 500);

        }

        return response()->json(compact('token'));
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout(Request $request)
    {
$content=$request->input();
var_dump($content['token']);
        $this->jwt->invalidate($content['token']);

        return response()->json(['message' => 'Successfully logged out']);
    }
}