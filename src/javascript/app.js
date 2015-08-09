(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ui.bootstrap', 'infinite-scroll'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('Register',{
			url: '/Register',
			templateUrl: 'views/register.html'
		}).state('Login',{
			url: '/Login',
			templateUrl: 'views/login.html'
		}).state('Cat',{
			url: '/Cat',
			templateUrl: 'views/cat.html'
		}).state('Style',{
			url: '/Style',
			templateUrl: 'views/style.html'
		}).state('Profile',{
			url: '/Profile',
			templateUrl: 'views/profile.html'
		}).state('Beer',{
			url: '/Beer',
			templateUrl: 'views/beer_profile.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
