var app = angular.module('picktimeApp', []);
var fotosYComentarios = [];

app.controller('wallCtrl', function ($scope, $http, $timeout) {
  $scope.showStartEvent=false;
 
 
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
         $scope.response = response.data;
      }).catch(function (response) {
         $timeout(function () {
            console.log(response)
         }, 0);
      });
   }

   $scope.crearComentario=function(id,index){
      nuevoComentario= {};
      nuevoComentario.description=$scope.fotoConComentarios[index].descripcion;
      nuevoComentario.photo_id=id;
      //////////////////REEMPLAZAR USUARIO!!!!
      $http.post('../api/public/comentarioByPhotoid/' + 4, nuevoComentario)
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

   $scope.cancelarComentario = function(id){
      $scope.fotoConComentarios[id].descripcion=""
   }

   $scope.editarUsuario= function(){
      $scope.showStartEvent= !$scope.showStartEvent;
  }

   $scope.guardarDescripcionEditada=function(fotoID,comentID, id){
      comentario={}
      var date = (new Date()).toISOString().split('T')[0];
      console.log(date)
      comentario.description=$scope.fotoConComentarios[fotoID].comentarios[comentID].descripcionEditada;
      comentario.date=date;
      console.log(comentario)
      $http.patch('../api/public/comments/'+ id, comentario)
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
   $scope.cancelarDescripcionEditada= function (fotoId, comentarioID){
     $scope.fotoConComentarios[fotoId].comentarios[comentarioID].descripcionEditada=""
   }


   $scope.eliminarComentario = function (id){
      $http.delete('../api/public/comments/'+ id)
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
});