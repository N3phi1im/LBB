(function() {
	'use strict';
	angular.module('app')
	.factory('BeerFactory', BeerFactory);

	BeerFactory.$inject = ['$http', '$q'];

	function BeerFactory($http, $q) {

		// Operations shortcuts

		var o = {};
		o.results = [];
		o.grabbed = [];
		o.cats = [];
		o.styles = [];
		o.searchBeer = searchBeer;
		o.grab = grab;
		o.getCategory = getCategory;
		o.getStyle = getStyle;
		return o;

		// Functions list

		// Search Beer

		function searchBeer(search) {
			var q = $q.defer();
			$http.post('/api/Beer/searchBeer', search).success(function(res) {
				o.results.length = 0;
				for (var i = 0; i < res.length; i++) {
					o.results.push(res[i]);
					q.resolve();
				}
			});
			return q.promise;
		}

		// Grab beer

		function grab(beer) {
			var q = $q.defer();
			$http.post('/api/Beer/grab', beer).success(function(res) {
				o.grabbed.length = 0;
				if(res) {
					o.grabbed.push(res);
					q.resolve();
				}
			});
			return q.promise;
		}

		// Show all Categories

		function getCategory() {
			var q = $q.defer();
			$http.post('/api/Beer/Category').success(function(res) {
				o.cats.length = 0;
				for (var i = 0; i <= 13; i++) {
					o.cats.push(res[i]);
					q.resolve();
				}
			});
			return q.promise;
		}

		// Show all Styles

		function getStyle() {
			var q = $q.defer();
			$http.post('/api/Beer/Style').success(function(res) {
				o.styles.length = 0;
				for (var i = 0; i < res.length; i++) {
					o.styles.push(res[i]);
					q.resolve();
				}
			});
			return q.promise;
		}
	}
})();
