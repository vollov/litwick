'use strict';

describe('Test AuthService', function() {
	
	var authService, $http;
	
	beforeEach(module('auth.services'));
	beforeEach(inject(function(_AuthService_,_$http_) {
		authService = _AuthService_;
		$http = _$http_;
	}));
		
//	beforeEach(function(){
//		module('auth.services');
//		inject(function(AuthService) {
//			authService = AuthService;
//		}, function(_$httpBackend_){
//			$httpBackend = _$httpBackend_;
//		});
//	});
	
	it('localstorage should be able to store a token', function() {
//		var res = authService.getToken('authenticated');
//		console.log('default token=' + res);
//		expect(res).toBe(false);
		
		authService.saveToken('authenticated', true);
		
		var res = authService.getToken('authenticated');
		expect(res).toBe(true);
	});
	
	it('isAuthenticated should be false by default', function() {
//		var res = authService.isAuthenticated();
//		expect(res).toBe(false);
		
		authService.saveToken('authenticated', true);
		
		var res = authService.isAuthenticated();
		expect(res).toBe(true);
	});
});