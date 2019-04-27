var app = angular.module('picktimeApp', []);
app.controller('usersCtrl', function($scope, $http, $window) {    
        $http.get("../api/public/user").then(function (response) {
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
   });

