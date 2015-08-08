(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ["HomeFactory", "UserFactory", "BeerFactory", "$state"];

	function HomeController(HomeFactory, UserFactory, BeerFactory, $state) {

		// Declarations

		var vm = this;
		vm.search = searchBeer;
		vm.getCategory = getCategory;
		vm.getStyle = getStyle;
		vm.results = BeerFactory.results;
		vm.cats = BeerFactory.cats;
		vm.styles = BeerFactory.styles;

		// Functions List

		function searchBeer() {
			BeerFactory.searchBeer().then(function() {
			});
		}

		function getCategory() {
			BeerFactory.getCategory().then(function() {
				$state.go('Cat');
			});
		}

		function getStyle() {
			BeerFactory.getStyle().then(function() {
				$state.go('Style');
			});
		}


	}
})();
