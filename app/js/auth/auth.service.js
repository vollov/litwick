'use strict';

angular.module('auth.services', [])
.constant('host', 'http://localhost:5001')
.constant('clientToken', 'ocbl-client-token')
.factory('AuthService', [ '$http', 'host', function($http, host) {

	var service = {
			users : [],
			groups : [],
			key: 'user-list',
	};

	service.saveToken = function(key, value){
		localStorage.setItem(key, JSON.stringify(value));
	}

	service.getToken = function(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	service.isAuthenticated = function() {
		return JSON.parse(localStorage.getItem('authenticated'));
	};

	service.register = function(user) {
		return $http.post(host + '/api/v1/accounts', user);
	}

	service.logIn = function(user) {
		return $http.post(host + '/api/v1/login', user);
	};

	service.logOut = function() {
		localStorage.removeItem('authenticated');
	};
	
	return service;
}]);
