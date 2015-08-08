(function() {
	'use strict';
	angular.module('app')
	.controller('IndexController', IndexController);

	IndexController.$inject = ["UserFactory", "$state"];

	function IndexController(UserFactory, $state) {

		// Declarations

		var ix = this;
		ix.user = {};
		ix.status = UserFactory.status;
		ix.register = register;
		ix.login = login;
		ix.logout = UserFactory.logout;

		// Functions List

		function register() {
			var u = ix.user;
			if(!u.username || !u.email || !u.password || !u.cpassword || (u.password !== u.cpassword)) {
				$window.alert("Please fill all fields!")
				return false;
			}
			UserFactory.register(u).then(function() {
				ix.user = {};
				$state.go('Home');
			});
		}

		function login() {
			UserFactory.login(ix.user).then(function() {
				ix.user = {};
				$state.go('Home');
			});
		}
	}
})();
