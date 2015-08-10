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
		o.add_had = add_had;
		getbeerhad();
		getbeerwant();
		return o;

		// Functions list

		// Add beer Had

		function add_had(beer) {
			var q = $q.defer();
			$http.post('/api/beers/beer_had', beer, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).success(function(res) {
				beer_had._id = res.id;
				beer_had.dateHad = new Date();
				beer_had.beer_had = beer;
				o.beer_had.push(beer);
				q.resolve();
			}).error(function(res) {
				q.reject(res);
			});
			return q.promise;
		}

		// Get beers Had

		function getbeerhad() {
			$http.get('/api/beers/beer_had', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).success(function(res) {
				for (var i = 0; i < res.length; i++) {
					res[i].dateHad = new Date(res[i].dateHad);
					o.beer_had.push(res[i].beer_had);
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


	}
})();
