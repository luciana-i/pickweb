angular.module('miApp').controller('loginCtrl', function($scope, $auth, $state) {
	$scope.login = function(){
		$auth.login({"mail": $scope.mail, "password": $scope.password }) 
			.then(function(response) {
				$auth.setToken(response.data.jwt);
				$state.go('dashboard');
			})
			.catch(function(response) {
				alert("Login incorrecto");
				$scope.mail = '';
				$scope.password = '';
			});
	};
});