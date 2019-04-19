angular.module('picktimeApp',[]).controller('usersCtrl', function($scope, $http, $timeout) {

    $scope.usr={name: '', lastName: '', mail: '', password: '', photo: ''};

    function uploadFiles(form){
        let barra_estado = form.children[1].children[0],
        span = barra_estado.children[0],
        boton_cancelar= form.children[2].children[0];
        // peticion

        let peticion = new XMLHttpRequest();

        peticion.addEventListener("load", (event)=>{
           span.innerHTML = "Archivo subido exitosamente"
        });

        // enviar datos

        peticion.open('post', 'subir')
    };
});