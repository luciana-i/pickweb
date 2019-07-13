angular.module('miApp', [ 'ui.router', 'satellizer'])

.controller('wallCtrl', function ($scope, $http, $timeout, $auth) {
	var fotosYComentarios = [];
	$scope.showStartEvent = false;
	$scope.showPhotoEvent = false;
 
 
	var initFotos = function () { 
	   $http.get("./api/public/photosByUserId/" + $auth.getPayload().sub).then(function (response) {
		  var array = response.data;
		  array.forEach(element => {
			 fotosYComentarios = element
			 for (let index = 0; index < fotosYComentarios.length; index++) {
				$http.get("./api/public/commentsByPhoto/" + fotosYComentarios[index].id).then(function (res) {
				   var arrayComentarios = res.data;
				   arrayComentarios.forEach(comentario => {
					  if (comentario.length > 0)
						 fotosYComentarios[index]['comentarios'] = (comentario)
				   })
				})
			 }
			 $scope.fotoConComentarios = (fotosYComentarios)
		  })
	   })
 
	}
	initFotos();
	$scope.uploadFoto = function () {
	   var id = 4; /////LLENAR ID CON ID USUARIO
	   var fd = new FormData();
	   var files = document.getElementById('file').files[0];
	   fd.append('file', files);
	   suboFoto(fd);
	   initFotos();
	}
 
	function suboFoto(fd) {
	   $http({
		  headers: {
			 'Content-Type': undefined
		  },
		  method: 'POST',
		  url: "./api/public/photos/" + $auth.getPayload().sub,
		  data: fd,
	   }).then(function successCallback(response) {
		  console.log(response);
		  $scope.response = response.data;
	   }).catch(function (response) {
		  $timeout(function () {
			 console.log(response)
		  }, 0);
	   });
	}
 
	$scope.editFoto = function (id) {
	   var fd = new FormData();
	   var files = document.getElementById('file' + id).files[0];
	   fd.append('file', files);
	   editoFoto(fd, $scope.fotoConComentarios[id].id);
	   initFotos();
	}
 
	function editoFoto(fd, id) {
	   $http({
		  headers: {
			 'Content-Type': undefined
		  },
		  method: 'POST',
		  url: "./api/public/editPhotos/" + id,
		  data: fd,
	   }).then(function successCallback(response) {
		  console.log(response);
		  $scope.response = response.data;
	   }).catch(function (response) {
		  $timeout(function () {
			 console.log(response)
		  }, 0);
	   });
	}
 
	$scope.crearComentario = function (id, index) {
	   nuevoComentario = {};
	   nuevoComentario.description = $scope.fotoConComentarios[index].descripcion;
	   nuevoComentario.photo_id = id;
	   $http.post('./api/public/comentarioByPhotoid/' + $auth.getPayload().sub, nuevoComentario)
		  .then(function (response) {
			 $timeout(function () {
				initFotos();
			 }, 0);
		  })
		  .catch(function (response) {
			 console.log(response)
			 $timeout(function () {
				alert('Error guardando comentario');
			 }, 0);
		  });
	}
 
	$scope.cancelarComentario = function (id) {
	   $scope.fotoConComentarios[id].descripcion = ""
	}
 
	$scope.editarUsuario = function (index) {
		 
	   if ($scope.selectedIndex == index) {
		  $scope.selectedIndex = null;
	   } else {
		  $scope.selectedIndex = index;
	   }
	}
 
	$scope.editarFoto = function (index) {
	   if ($scope.selected == index) {
		  $scope.selected = null;
	   } else {
		  $scope.selected = index;
	   }
	}

	$scope.guardarDescripcionEditada = function (fotoID, comentID, id) {
	   comentario = {}
	   var date = (new Date()).toISOString().split('T')[0];
	   console.log(date)
	   comentario.description = $scope.fotoConComentarios[fotoID].comentarios[comentID].descripcionEditada;
	   comentario.date = date;
	   console.log(comentario)
	   $http.patch('./api/public/comments/' + id, comentario)
		  .then(function (response) {
			 console.log(response)
			 $timeout(function () {
				initFotos();
			 }, 0);
		  })
		  .catch(function (response) {
			 console.log(response)
			 $timeout(function () {
				alert('Error guardando comentario');
			 }, 0);
		  });
	}
	$scope.cancelarDescripcionEditada = function (fotoId, comentarioID) {
	   $scope.fotoConComentarios[fotoId].comentarios[comentarioID].descripcionEditada = ""
	}
 
 
	$scope.eliminarComentario = function (id) {
	   $http.delete('./api/public/comments/' + id)
		  .then(function (response) {
			 console.log(response)
			 $timeout(function () {
				initFotos();
			 }, 0);
		  })
		  .catch(function (response) {
			 console.log(response)
			 $timeout(function () {
				alert('Error eliminando comentario');
			 }, 0);
		  });
		  
	}
 
	$scope.eliminarFoto = function (index) {
	   $scope.fotoConComentarios[index].id
	   debugger
	   $http.delete('./api/public/photos/' + $scope.fotoConComentarios[index].id)
		  .then(function (response) {
			 console.log(response)
			 $timeout(function () {
				initFotos();
			 }, 0);
		  })
		  .catch(function (response) {
			 console.log(response)
			 $timeout(function () {
				alert('Error eliminando comentario');
			 }, 0);
		  });
	}
	initFotos();
 })

 .controller('profileCtrl', function($scope, $http, $timeout, $auth) {
    $scope.esVisible=false;
    function initUsuario(){ 
        $http.get("./api/public/userById/"+ $auth.getPayload().sub).then(function (response) {
            var array= response.data;
            array.forEach(element => {
                $scope.usr=(element);   
            });
        })
    }
    $scope.MostrarFoto= function(){
        $scope.esVisible= !$scope.esVisible;
    }
    $scope.upload= function (){ 
        var fd = new FormData();
                var files = document.getElementById('file').files[0];
                fd.append('file', files);
                debugger
                // AJAX request
                $http({
                    method: 'POST',
                    url: "./api/public/userPhoto/" + $auth.getPayload().sub,
                    data: fd,
                    headers: {
                        'Content-Type': undefined
                    },
                }).then(function successCallback(response) {
                    console.log(response);
                    $scope.response = response.data;
                  
                }) .catch(function (response) {
                    $timeout(function () {
                        console.log(response)
                    }, 0);
                });
                initUsuario();            
    }
    initUsuario();
})

.controller('findFriendsCtrl', function($scope, $http, $window) {    
	$http.get("./api/public/user").then(function (response) {
		var array= response.data;
		array.forEach(element => {
			$scope.users=(element);   
		});
	})
	$scope.goToWall= function(id){
		var userID=undefined;
		$window.localStorage.setItem(userID,id)
		$window.location.href='../views/userWall.html';
	}
})

.controller('usersCtrl', function($scope, $http, $timeout) {    
	var initUsuarios = function(){
	$http.get("./api/public/user").then(function (response) {
		var array= response.data;
		array.forEach(element => {
			$scope.users=(element);   
		});
	})
}

$scope.eliminarUsuario = function (user) {
   // debugger
	$http.delete('./api/public/user/' +user)
		.then(function (response) {
			$timeout(function () {
				initUsuarios();
			}, 0);
		})
		.catch(function () {
			$timeout(function () {
				alert('Error borrando usuario');
			}, 0);
		});
}
$scope.editarUsuario= function(usuario){ 
	$scope.users.forEach(element=> {
		if(element==usuario){
			$scope.editedUser=element;
		}
	})
}
$scope.guardarUsuarioEditado = function (usuario) {
   console.log(usuario)
	$http.patch('./api/public/user/' + usuario.id, usuario)
		.then(function (response) {
			$timeout(function () {
				initUsuarios();
				$scope.cancelarUsuarioEditado();
			}, 0);
		})
		.catch(function () {
			$timeout(function () {
				alert('Error guardando usuario editado');
			}, 0);
		});
	}

	$scope.cancelarUsuarioEditado = function () {
	$scope.nuevoUsuario = {
		nombre: '',
		mail: '',
		contrasenia: '',
		id_rol: ''
	};
}
initUsuarios();  
})

.controller('registerCtrl', function($scope, $auth, $state, $http, $timeout) {
	$scope.nuevoUsuario = {
		name: '',
		lastName: '',
		mail: '',
		password: '',
		rol: 'user'
	};
	
	$scope.register = function () {
		$http.post('./api/public/user', $scope.nuevoUsuario)
			.then(function (response) {
				$timeout(function () {
					console.log(response.data)
					$scope.nuevoUsuario.nombre = '';
					$scope.nuevoUsuario.apellido = '';
					$scope.nuevoUsuario.mail = '';
					$scope.nuevoUsuario.password = '';
					alert("Usuario creado, por favor inicia sesion");
				}, 0);
			})
			.catch(function (response) {
				console.log(response.data)
				$timeout(function () {
					
					//$scope.cancelarUsuarioNuevo();
					alert('Error guardando nuevo usuario');
				}, 0);
			});

	};
})

.run(function($rootScope, $auth, $state) {
    $rootScope.rs_logout = function() {
		if(confirm("Desea salir del sistema?")){
			$auth.logout();
			$auth.removeToken();
			$state.go('login');
		}
	}
})

.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {
	
	var rutaRelativa = window.location.pathname.substr(0,window.location.pathname.lastIndexOf('/'))+'/';
	$authProvider.baseUrl = rutaRelativa;
	$authProvider.loginUrl = 'api/public/auth/login';

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'vistas/login.html',
			controller: 'loginCtrl',
		/*	resolve: {
				necesitaLogin: saltarSiLogueado
			},
		*/	
		})
		.state('login', {
			url: '/login',
			templateUrl: './vistas/login.html',
			controller: 'loginCtrl',
		/*	resolve: {
				necesitaLogin: saltarSiLogueado
			},
		
		*/	})
		.state('register', {
			url: '/register',
			templateUrl: './vistas/register.html',
			controller: 'registerCtrl',
		/*	resolve: {
				necesitaLogin: saltarSiLogueado
			},
		
		*/	})
		.state('muro', {
			url: '/wall',
			templateUrl: './vistas/wall.html',
			controller:'wallCtrl',
		/*	resolve: {
				necesitaLogin: loginRequerido
			},
			
		*/	})
		.state('perfil', {
			url: '/profile',
			templateUrl: './vistas/profile.html',
			controller:'profileCtrl',
		/*	resolve: {
				necesitaLogin: loginRequerido
			},
			
		*/	})
		.state('findfriends', {
			url: '/findfriends',
			templateUrl: './vistas/findfriends.html',
			controller:'findFriendsCtrl',
		/*	resolve: {
				necesitaLogin: loginRequerido
			},
			
		*/	})
		.state('users', {
			url: '/users',
			templateUrl: './vistas/users.html',
			controller:'usersCtrl',
		/*	resolve: {
				necesitaLogin: loginRequerido
			},
			
		*/	})
		.state('404', {
			url: '/404',
			templateUrl: 'vistas/404.html',
		})
	
	
	$urlRouterProvider.otherwise("/404");
	
	function saltarSiLogueado($q, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.reject();
		} else {
			deferred.resolve();
		}
		return deferred.promise;
    };

    function loginRequerido($q, $auth, $location) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$location.path('/login');
		}
		return deferred.promise;
	}

	function saltarSiNoAdmin($q, $auth, $location) {
		var deferred = $q.defer();
		if ($auth.getPayload().rol = 'admin') {
			deferred.resolve();
		} else {
			console.log('no es usuario admin, permiso denegado');
		}
		return deferred.promise;
	}
})

;
/*
			
			
			
			
	

*/