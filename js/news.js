var app = angular.module('picktimeApp', []);
app.controller('newsCtrl', function ($scope, $http, $timeout) {
   var fotosYComentarios = [];

   var initFotos = function () { 
      $http.get("../api/public/photos").then(function (response) {
         console.log(response.data)
         var array = response.data;
         array.forEach(element => {
            fotosYComentarios = element
            for (let index = 0; index < fotosYComentarios.length; index++) {
               $http.get("../api/public/commentsByPhoto/" + fotosYComentarios[index].id).then(function (res) {
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
});