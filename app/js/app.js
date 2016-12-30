'use strict';

angular.module('ocblApp', ['ui.router', 'auth'])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('home', {
		url : '/home',
		templateUrl : 'views/home.html',
		data:{
			requireLogin: false
		}
		//controller : 'MainCtrl'
	});
  $urlRouterProvider.otherwise('home');
}])
.run(['$rootScope','$state','$http', 'AuthService',function ($rootScope,$state,$http,AuthService) {
	// Update xsrf $http headers to align with Django's defaults
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';
	$http.defaults.xsrfCookieName = 'csrftoken';
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
		var requireLogin = toState.data.requireLogin;
		console.log('state change event, isAuthenticated=%s', AuthService.isAuthenticated());
		// typeof $rootScope.currentUser === 'undefined'
		if (requireLogin && (!AuthService.isAuthenticated())) {
			event.preventDefault();
			// code for unauthorized access
			console.log('state change event -- unauthorized');
			$state.go('login');
		}
	});
}]);
