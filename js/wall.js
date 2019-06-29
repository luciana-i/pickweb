var app = angular.module('picktimeApp', []);
var fotosYComentarios = [];
var comentarios;
app.controller('wallCtrl', function ($scope, $http, $timeout) {
   
   var initFotos = function () { ///////////////MODIFICAR POR EL USUARIO QUE ESTA UTILIZANDO
      $http.get("../api/public/photosByUserId/" + 4).then(function (response) {
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
   $scope.upload = function () {
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
         url: "../api/public/photos/" + 4,
         data: fd,
      }).then(function successCallback(response) {
         console.log(response);
         debugger
         $scope.response = response.data;

      }).catch(function (response) {
         $timeout(function () {
            console.log(response)
         }, 0);
      });
   }

   $scope.crearComentario=function(photoId){
      debugger;
      var nuevoComentario;
      for(let index = 0; index < fotosYComentarios.length; index++){
        if(fotosYComentarios[index].id==photoId){
         nuevoComentario=fotosYComentarios[index];
        }
      }
      $http.post('../api/public/comentarioByPhotoid/' + photoId, nuevoComentario)
      .then(function (response) {
          $timeout(function () {
              initUsuarios();
             // $scope.cancelarUsuarioEditado();
          }, 0);
      })
      .catch(function () {
          $timeout(function () {
              alert('Error guardando comentario');
          }, 0);
      });
      
   }

   initFotos();
});