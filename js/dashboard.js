angular.module('miApp',['ui.router', 'satellizer'])
.controller('dashboardCtrl', function ($scope, $http, $window, $auth, $timeout, $state) {
    $scope.fotos = {}
    $scope.persona = []

    $http.get("./api/public/photosFromTimeRange/").then(function (response) {
        var array = response.data;
        array.forEach(element => {
            $scope.fotos = (element);

        })
        $scope.goToWall = function (id) {
            var userID = undefined;
            $window.localStorage.setItem(userID, id)
            $state.go('userWall')
        }
    })
    $http.get("./api/public/userById/" + $auth.getPayload().sub).then(function (response) {
        $scope.persona = response.data[0];
    })
});