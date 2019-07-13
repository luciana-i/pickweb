<?php

define('ALGORITMO', 'HS512'); // Algoritmo de codificación/firma
define('SECRET_KEY', 'AS..-.DJKLds·ak$dl%Ll!3kj12l3k1sa4_ÑÑ312ñ12LK3Jj4DK5A6LS7JDLK¿?asDqiwUEASDL,NMQWIEUIO'); //String largo y "complicado"

require_once 'jwt_helper.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$comandos = explode('/', strtolower($_GET['accion']));
$funcionNombre = $metodo.ucfirst($comandos[0]);

if(function_exists($funcionNombre))
	call_user_func_array ($funcionNombre, array_slice($comandos, 1) );
else
	header(' ', true, 400);


function postLogin(){
	$loginData = json_decode(file_get_contents("php://input"), true);
	
	if($loginData['email']=='pepe@pepe.com' && $loginData['clave']=='123') {
		$data = [
			'usuario' => 'Pepe Trueno',
			'email' => 'pepe@pepe.com',
		];
		$jwt = JWT::encode(
					$data,      // Datos a codificar en el JWT
					SECRET_KEY, // Clave de coficicación/firma del token
					ALGORITMO   // Algoritmo usado para codificar/firmar el token
					);
					
		$arregloToken = ['jwt' => $jwt];
		
		header(' ', true, 200);
		header('Content-type: application/json');
		echo json_encode($arregloToken);

	} else {
		header(' ', true, 401);
	}
}

function getTexto() {
	
	$authHeader = getallheaders();

    if (isset($authHeader['Authorization'])) {

		list($jwt) = sscanf( $authHeader['Authorization'], 'Bearer %s');
		try
		{
			$token = JWT::decode($jwt, SECRET_KEY, ALGORITMO);

			header(' ', true, 200);
			header('Content-type: application/json');
			echo json_encode('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
		}
		catch(Exception $e) 
		{
			header(' ', true, 401);
		}
	
	} else {
		header(' ', true, 401);
	}
}

?>