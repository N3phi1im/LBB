(function() {
	'use strict';
	angular.module('app')
	.factory('BeerFactory', BeerFactory);

	BeerFactory.$inject = ['$http', '$q'];

	function BeerFactory($http, $q) {

		// Operations shortcuts

		var o = {};
		o.results = [];
		o.cats = [];
		o.styles = [];
		o.searchBeer = searchBeer;
		o.getCategory = getCategory;
		o.getStyle = getStyle;
		return o;

		// Functions list

		// Search Beer

		function searchBeer() {
			var q = $q.defer();
			$http.post('/api/Beer/searchBeer').success(function(res) {
				o.results.length = 0;
				for (var i = 0; i < res.length; i++) {
					o.results.push(res[i]);
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
				for (var i = 0; i < res.length; i++) {
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
