var app = angular.module('picktimeApp', []);
app.controller('userWallController', function($scope, $http, $window) {
    var userID;
    var userId=$window.localStorage.getItem(userID);
    
    
       $http.get("../api/public/userById/"+userId).then(function (response) {
           console.log(userId)
        })
       
   });

