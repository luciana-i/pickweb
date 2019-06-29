var app = angular.module('picktimeApp', []);
app.controller('usersCtrl', function($scope, $http, $timeout) {    
        var initUsuarios = function(){
        $http.get("../api/public/user").then(function (response) {
            var array= response.data;
            array.forEach(element => {
                $scope.users=(element);   
            });
        })
    }

    $scope.eliminarUsuario = function (user) {
       // debugger
        $http.delete('../api/public/user/' +user)
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
        $http.patch('../api/public/user/' + usuario.id, usuario)
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
   });

