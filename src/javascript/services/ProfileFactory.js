(function() {
	'use strict';
	angular.module('app')
	.factory('ProfileFactory', ProfileFactory);

	ProfileFactory.$inject = ['$http', '$q'];

	function ProfileFactory($http, $q) {

		// Operations shortcuts

		var o = {};
		o.beer_had = [];
		o.beer_want = [];
		o.grabbed = [];
		o.add_had = add_had;
		o.getbeerhad = getbeerhad;
		o.getbeerwant = getbeerwant;
		return o;

		// Functions list

		// Add beer Had

		function add_had(beer) {
			var q = $q.defer();
			$http.post('/api/beers/beer_had', beer, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).success(function(res) {
				beer._id = res.id;
				beer.dateHad = new Date();
				o.beer_had.push(beer);
				q.resolve();
			}).error(function(res) {
				console.error('YOU DONE MESSED UP! A A RON!');
				q.reject(res);
			});
			return q.promise;
		}

		// Get beers Had

		function getbeerhad() {
			$http.get('/api/beers/beer_had', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).success(function(res) {
				for (var i = 0; i < res.length; i++) {
					res[i].dateHad = new Date(res[i].dateHad);
					o.beer_had.push(res[i]);
				}
			});
		}

		// Get Beer Wishlist

		function getbeerwant()  {
			$http.get('/api/beers/beer_want').success(function(res) {
				for (var i = 0; i < res.length; i++) {
					o.beer_want.push(res[i]);
				}
			});
		}

		function grab(beer) {
			var q = $q.defer();
			$http.post('/api/beers/grab', beer).success(function(res) {
				o.grabbed.length = 0;
				if(res) {
					o.grabbed.push(res);
					q.resolve();
				}
			});
			return q.promise;
		}


	}
})();
