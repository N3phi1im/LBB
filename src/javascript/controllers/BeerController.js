(function() {
	'use strict';
	angular.module('app')
	.controller('BeerController', BeerController);

	BeerController.$inject = ["HomeFactory", "UserFactory", "BeerFactory", "$state"];

	function BeerController(HomeFactory, UserFactory, BeerFactory, $state) {

		// Declarations

		var bc = this;
		bc.grabbed = BeerFactory.grabbed;
		bc.beers = {};
		// Functions List

		bc.grab = function(beer) {
			bc.beers.id = beer;
				BeerFactory.grab(bc.beers).then(function() {
					$state.go('Beer');
				});
		};


	}
})();
