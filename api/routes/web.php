<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->get('/key', function () use ($router) {
    return str_random(32);
});
$router->get('/user', ['uses' => 'UsersController@getUser']);
$router->get('userById/{id}', ['uses' => 'UsersController@getUserById', function($id=null){return $id;}]);
$router->post('/user', ['uses' => 'UsersController@createUser']);
$router->patch('/user/{id}', ['uses' => 'UsersController@updateUser']);
$router->delete('/user/{id}', ['uses' => 'UsersController@deleteUser']);
$router->post('/userPhoto/{id}', ['uses' => 'UsersController@postPhoto']);
$router->get('userByPhoto/{id}', ['uses' => 'UsersController@getUserFromPhoto', function($id=null){return $id;}]);



$router->get('/photos', ['uses' => 'PhotosController@getPhotos']);
$router->get('photoById/{id}', ['uses' => 'PhotosController@getPhotoById', function($id=null){return $id;}]);
$router->post('/photos/{id}', ['uses' => 'PhotosController@createPhotos']);
$router->post('/editPhotos/{id}', ['uses' => 'PhotosController@updatePhotos']);
$router->delete('/photos/{id}', ['uses' => 'PhotosController@deletePhotos']);
$router->get('/photosByUserId/{id}', ['uses' => 'PhotosController@getPhotosByUserId']);
$router->get('/photosFromTimeRange', ['uses' => 'PhotosController@getPhotosFromTimeRange']);


$router->get('/comments', ['uses' => 'CommentsController@getComments']);
$router->get('commentsById/{id}', ['uses' => 'CommentsController@getCommentsById', function($id=null){return $id;}]);
$router->post('/comentarioByPhotoid/{id}', ['uses' => 'CommentsController@createCommentsByPhotoId', function($id=null){return $id;}]);
$router->patch('/comments/{id}', ['uses' => 'CommentsController@updateComments']);
$router->delete('/comments/{id}', ['uses' => 'CommentsController@deleteComments']);
$router->get('/commentsByPhoto/{id}', ['uses' => 'CommentsController@getCommentsByPhotoId', function($id=null){return $id;}]);

$router->get('/applicationBackground', ['uses' => 'ApplicationStyleController@getBackground']);
$router->patch('/applicationBackgroundUpdate/{id}', ['uses' => 'ApplicationStyleController@updateBackground']);

$router->post('/auth/login', 'AuthController@postLogin');
$router->post('/loggedUser', 'AuthController@me');
$router->post('/auth/logout', 'AuthController@logout');