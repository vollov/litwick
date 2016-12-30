'use strict';

angular.module('auth', ['auth.controllers','ui.router'])
.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('login', {
		url : '/login',
		templateUrl : 'js/auth/views/login.html',
		controller : 'LoginCtrl',
		controllerAs: 'vm',
		onEnter : [ '$state', 'AuthService', function($state, AuthService) {
			// disable login if user is authenticated
			if (AuthService.isAuthenticated()) {
				$state.go('home');
			}
		} ],
		data:{
			requireLogin: false
		}
	})
	.state('register', {
		url : '/register',
		templateUrl : 'js/auth/views/register.html',
		controller : 'RegisterCtrl',
		controllerAs: 'vm',
		onEnter : [ '$state', 'AuthService', function($state, AuthService) {
			// disable login if user is authenticated
			if (AuthService.isAuthenticated()) {
				$state.go('home');
			}
		} ],
		data:{
			requireLogin: false
		}
	})
	.state('profile', {
		url : '/profile',
		templateUrl : 'js/auth/views/profile.html',
		controller: 'ProfileCtrl',
		controllerAs: 'vm',
		data:{
			requireLogin: true
		}
	});

}]);
