angular.module('miApp').controller('registerCtrl', function($scope, $auth, $state, $http) {
	$scope.nuevoUsuario = {
		name: '',
		lastName: '',
		mail: '',
		password: '',
		rol: 'user'
	};
	
	$scope.register = function () {
		$http.post('./api/public/user', $scope.nuevoUsuario)
			.then(function (response) {
				$timeout(function () {
					$scope.nuevoUsuario.nombre = '';
					$scope.nuevoUsuario.apellido = '';
					$scope.nuevoUsuario.mail = '';
					$scope.nuevoUsuario.password = '';
					alert("Usuario creado, por favor inicia sesion");
				}, 0);
			})
			.catch(function () {
				$timeout(function () {
					$scope.cancelarUsuarioNuevo();
					alert('Error guardando nuevo usuario');
				}, 0);
			});

	};
});
