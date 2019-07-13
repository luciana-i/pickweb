angular.module('miApp').controller('loginCtrl', function($scope, $auth, $state) {
	$scope.login = function(){
		$auth.login({"mail": $scope.mail, "password": $scope.password }) 
			.then(function(response) {
				debugger
				$auth.setToken(response.data.jwt);
				$state.go('muro');
			})
			.catch(function(response) {
				alert("Login incorrecto");
				$scope.mail = '';
				$scope.password = '';
			});
	};
});