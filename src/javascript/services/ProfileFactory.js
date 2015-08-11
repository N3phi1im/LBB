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
		o.grab = grab;
		o.add_had = add_had;
		o.add_want = add_want;
		o.getbeerhad = getbeerhad;
		o.getbeerwant = getbeerwant;
		o.delete_beer = delete_beer;
		o.like = like;
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
				o.beer_had.length = 0;
				for (var i = 0; i < res.length; i++) {
					res[i].dateHad = new Date(res[i].dateHad);
					o.beer_had.push(res[i]);
				}
			});
		}

		// Add beer Had

		function add_want(beer) {
			var q = $q.defer();
			$http.post('/api/beers/beer_want', beer, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).success(function(res) {
				beer._id = res.id;
				o.beer_want.push(beer);
				q.resolve();
			}).error(function(res) {
				console.error('YOU DONE MESSED UP! A A RON!');
				q.reject(res);
			});
			return q.promise;
		}

		// Get Beer Wishlist

		function getbeerwant()  {
			$http.get('/api/beers/beer_want', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).success(function(res) {
				o.beer_want.length = 0;
				for (var i = 0; i < res.length; i++) {
					o.beer_want.push(res[i]);
				}
			});
		}

		function grab(id, which) {
			var q = $q.defer();
			$http.get('/api/beers/grab/' + which + '/' + id).success(function(res) {
				o.grabbed.length = 0;
				if(res) {
					o.grabbed.push(res);
					q.resolve();
				}
			});
			return q.promise;
		}

		function delete_beer(id) {
			var q = $q.defer();
			$http.delete('/api/beers/beer_want/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).success(function(res) {
				q.resolve();
			});
			return q.promise;
		}

		function like(tf, id) {
			var q = $q.defer();
			$http.put('/api/beers/beer_had/' + id, {like: tf}, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).success(function(res) {
				q.resolve();
			});
			return q.promise;
		}

	}
})();
