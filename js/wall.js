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
   $scope.upload= function (){ 
      var fecha = new Date().toISOString().slice(0,10); 
      var id= 4; /////LLENAR ID CON ID USUARIO
      var objeto ={};
      objeto['fecha']=fecha;
      objeto['user_id']=id;
      var fd = new FormData();
              var files = document.getElementById('file').files[0];
              fd.append('file', files);
           //   fd.append('objeto',objeto);
              $http({
                  method: 'POST',
                  url: "../api/public/photos",
                  data: fd,
              }).then(function successCallback(response) {
                  console.log(response);
                  debugger
                  $scope.response = response.data;
                
              }) .catch(function (response) {
                  $timeout(function () {
                      console.log(response)
                  }, 0);
              });           
  }

  
  initFotos();
});


