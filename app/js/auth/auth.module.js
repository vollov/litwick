'use strict';

angular.module('auth', ['auth.controllers','ui.router'])
.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('login', {
		url : '/login',
		templateUrl : 'js/auth/views/login.html',
		controller : 'LoginCtrl',
		controllerAs: 'vm'
		// resolve: {
		// 	confPromise: ['confService', function(confService){
		// 		return userService.load();
		// 	}]
		// }
	})
  .state('register', {
		url : '/register',
		templateUrl : 'js/auth/views/register.html',
		controller : 'RegisterCtrl',
		controllerAs: 'vm'
		// resolve: {
		// 	confPromise: ['confService', function(confService){
		// 		return userService.load();
		// 	}]
		// }
	});

}]);
