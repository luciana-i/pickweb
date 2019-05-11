angular.module('picktimeApp',[]).controller('usersCtrl', function($scope, $http, $timeout) {
    $scope.esVisible=false;
    function initUsuario(){ ///////////COMPLETAR CON EL ID DE USUARIO
        $http.get("../api/public/userById/"+ 4).then(function (response) {
            var array= response.data;
            array.forEach(element => {
                $scope.usr=(element);   
            });
        })
    }
    $scope.MostrarFoto= function(){
        $scope.esVisible= !$scope.esVisible;
    }
    $scope.upload= function (){ ///////////COMPLETAR CON EL ID DE USUARIO
        var fd = new FormData();
                var files = document.getElementById('file').files[0];
                fd.append('file', files);
                debugger
                // AJAX request
                $http({
                    method: 'POST',
                    url: "../api/public/userPhoto/" + 4,
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
});