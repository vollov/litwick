'use strict';

angular.module('auth.controllers', ['auth.services'])
.controller('NavCtrl', ['$state','AuthService',function($state, AuthService){
	var vm = this;
	
	vm.isAuthenticated = function(){
		var res = AuthService.isAuthenticated();
		console.log('NavCtrl.isAuthenticated() res =' + res);
		return res;
	}
	
	vm.user = AuthService.getToken('ocbl.user');
	
	vm.logout = function(){
		console.log('NavCtrl.logout()');
		AuthService.logout();
		$state.go('home');
	}
}])
.controller('ProfileCtrl', ['AuthService', function(AuthService){
	var vm = this;
	activate();
	
	// initialize the user when loading
	function activate(){
		vm.user = AuthService.getToken('ocbl.user');
		console.log('get returned user from localstorage, vm.user=%j', vm.user);
	}
}])
.controller('RegisterCtrl', ['$state', 'AuthService',
function($state, AuthService) {
	var vm = this;
	vm.user = {};
	
	vm.register = function() {
		return AuthService.register(vm.user).then(registerSuccessFn, registerErrorFn);

		function registerSuccessFn(data, status, headers, config) {
			// if return data have user, set token to true.
			console.log('get returned data from register(), data=%j', data.data);
			AuthService.saveToken('authenticated', true);
			AuthService.saveToken('ocbl.user', data.data);
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
		console.log('in LoginCtrl.login() user = {0}', vm.user.username);
		AuthService.login(vm.user).then(loginSuccessFn, loginErrorFn);
		
		function loginSuccessFn(data, status, headers, config) {
			console.log('get returned data from login(), data=%j', data.data);
			
			AuthService.saveToken('authenticated', true);
			AuthService.saveToken('ocbl.user', data.data);
			$state.go('profile');
		}

		function loginErrorFn(data, status, headers, config) {
			console.error('login failure!');
		}
	}
}]);
