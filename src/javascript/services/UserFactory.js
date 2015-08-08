(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	UserFactory.$inject = ['$http', '$q', '$state'];

	function UserFactory($http, $q, $state) {

		// Operations shortcuts

		var o = {};
		o.status = {};
		if(getToken()) {
			o.status.isLoggedIn = true;
			o.status.username = getUsername();
		}
		o.setToken = setToken;
		o.getToken = getToken;
		o.removeToken = removeToken;
		o.register = register;
		o.login = login;
		o.logout = logout;
		return o;

		// Functions list

		// Register User and Log them in

		function register(user) {
			var q = $q.defer();
			$http.post('/api/Users/Register', user).success(function(res) {
				setToken(res.token);
				o.status.isLoggedIn = true;
				q.resolve();
			});
			return q.promise;
		}

		// Login User

		function login(user) {
			var u = { username: user.username.toLowerCase(), password: user.password};
			var q = $q.defer();
			$http.post('/api/Users/Login', u).success(function(res) {
				setToken(res.token);
				o.status.isLoggedIn = true;
				q.resolve();
			});
			return q.promise;
		}

		// Logout User

		function logout() {
			o.status.isLoggedIn = false;
			removeToken();
			$state.go('Login');
		}

		// Put Token in Client Storage

		function setToken(token) {
			localStorage.setItem('token', token);
			o.status.username = getUsername();
		}

		// Get token from Client Storage

		function getToken() {
			return localStorage.token;
		}

		// Remove Token from Client

		function removeToken() {
			localStorage.removeItem('token');
			o.status.username = null;
		}

		// Get User Name

		function getUsername() {
			return JSON.parse(atob(getToken().split('.')[1])).username;
		}
	}
})();
