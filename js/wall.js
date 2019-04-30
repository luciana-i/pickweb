var app = angular.module('picktimeApp', []);
var fotosYComentarios=[];
var comentarios;
app.controller('wallCtrl', function ($scope, $http, $timeout) {
   var initFotos = function () { ///////////////MODIFICAR POR EL USUARIO QUE ESTA UTILIZANDO
   $http.get("../api/public/photosByUserId/" + 4).then(function (response) {
      var array = response.data;
      array.forEach(element => {
         fotosYComentarios=element
            for (let index = 0; index < fotosYComentarios.length; index++) {
               $http.get("../api/public/commentsByPhoto/" + fotosYComentarios[index].id).then(function (res) {
                     var arrayComentarios=res.data;
                     arrayComentarios.forEach(comentario=>{
                        if(comentario.length>0)
                        fotosYComentarios[index]['comentarios']=(comentario)
                        
                     })
               })
            }
            $scope.fotoConComentarios=(fotosYComentarios)
         })
      })
   }     
   initFotos();
});


