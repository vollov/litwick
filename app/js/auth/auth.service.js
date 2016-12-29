'use strict';

angular.module('auth.services', [])
.constant('api_url_root', 'http://localhost:8000/api')
.constant('clientToken', 'ocbl-client-token')
.factory('AuthService', [ '$http', 'api_url_root', function($http, api_url_root) {

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
		var authenticated = localStorage.getItem('authenticated');
		if(authenticated)
			return JSON.parse(authenticated);
		else
			return false;
	};

	service.register = function(user) {
		return $http.post(api_url_root + '/registration', user);
	}

	service.login = function(user) {
		return $http.post(api_url_root + '/login', user);
	};

	service.logout = function() {
		localStorage.removeItem('authenticated');
	};
	
	return service;
}]);
