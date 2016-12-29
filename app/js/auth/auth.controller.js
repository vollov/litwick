'use strict';

angular.module('auth.controllers', ['auth.services'])
.controller('NavCtrl', [function(){

}])
.controller('RegisterCtrl', ['$state', 'AuthService',
function($state, AuthService) {
	var vm = this;
	vm.user = {};
	
	vm.register = function() {
		return AuthService.register(vm.user).then(registerSuccessFn, registerErrorFn);

		function registerSuccessFn(data, status, headers, config) {
			// if return data have user, set token to true.
			console.log(data);
			AuthService.saveToken('authenticated', true);
			AuthService.saveToken('ocbl.user', data);
			$state.go('profile');
		}

		function registerErrorFn(data, status, headers, config) {
			console.error('register failure!');
		}
	};
}])
.controller('LoginCtrl', ['$state', 'AuthService',
function($state, AuthService) {
	var vm = this;
	vm.user = {};

	vm.login = function(){
		AuthService.login(vm.user).then(loginSuccessFn, loginErrorFn);
		
		function loginSuccessFn(data, status, headers, config) {
			AuthService.saveToken('authenticated', true);
			AuthService.saveToken('ocbl.user', data);
			$state.go('profile');
		}

		function loginErrorFn(data, status, headers, config) {
			console.error('login failure!');
		}
	}
}]);
