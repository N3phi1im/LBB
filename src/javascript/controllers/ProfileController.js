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
		pc.grab = grab;
		pc.grabbed = ProfileFactory.grabbed;
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

		function grab(beer) {
				ProfileFactory.grab(beer).then(function() {
					$state.go('Profile_beer');
				});
		}

	}
})();
