var app = angular.module('picktimeApp', []);
app.controller('wallCtrl', function ($scope, $http, $timeout) {
   var fotosYComentarios = [];
   $scope.showStartEvent = false;
   $scope.showPhotoEvent = false;


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

   $scope.editFoto = function (id) {
      var fd = new FormData();
      var files = document.getElementById('file' + id).files[0];
      fd.append('file', files);
      editoFoto(fd, $scope.fotoConComentarios[id].id);
      initFotos();
   }

   function editoFoto(fd, id) {
      debugger
      $http({
         headers: {
            'Content-Type': undefined
         },
         method: 'POST',
         url: "../api/public/editPhotos/" + id,
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
      $http.patch('../api/public/comments/' + id, comentario)
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
      $http.delete('../api/public/comments/' + id)
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
      $http.delete('../api/public/photos/' + $scope.fotoConComentarios[index].id)
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