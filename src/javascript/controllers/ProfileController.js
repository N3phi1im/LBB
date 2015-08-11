(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ["HomeFactory", "UserFactory", "BeerFactory", "ProfileFactory", "$state"];

	function ProfileController(HomeFactory, UserFactory, BeerFactory, ProfileFactory, $state) {

		// Declarations

		var pc = this;
		pc.beer_had = ProfileFactory.beer_had;
		pc.beer_want = ProfileFactory.beer_want;
		pc.add_had = add_had;
		pc.add_want = add_want;
		pc.grabhad = grabhad;
		pc.grabwant = grabwant;
		pc.grabbed = ProfileFactory.grabbed;
		pc.delete_beer = delete_beer;
		pc.tried = tried;
		pc.like = like;
		ProfileFactory.getbeerhad();
		ProfileFactory.getbeerwant();

		// Functions List

		function add_had(beer) {
			ProfileFactory.add_had(beer).then(function() {
				$state.go('Profile');
			});
		}

		function add_want(beer) {
			ProfileFactory.add_want(beer).then(function() {
				$state.go('Home');
			});
		}

		function grabhad(beer, which) {
			ProfileFactory.grab(beer, which).then(function() {
				$state.go('Profile_beer');
			});
		}

		function grabwant(beer, which) {
			ProfileFactory.grab(beer, which).then(function() {
				$state.go('Wishlist_selected');
			});
		}

		function delete_beer(id) {
			ProfileFactory.delete_beer(id).then(function() {
				$state.go('Wishlist');
			});
		}

		function tried(beer, id) {
			ProfileFactory.add_had(beer).then(function() {
				ProfileFactory.delete_beer(id).then(function() {
					$state.go('Wishlist');
				});
			});
		}

		function like(tf) {
			ProfileFactory.like(tf).then(function() {
					$state.go('Profile');
			});
		}

	}
})();
