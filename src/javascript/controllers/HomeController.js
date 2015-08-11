(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ["HomeFactory", "UserFactory", "BeerFactory", "$state", "$scope"];

	function HomeController(HomeFactory, UserFactory, BeerFactory, $state, $scope) {

		// Declarations

		var vm = this;
		vm.search = searchBeer;
		vm.getCategory = getCategory;
		vm.getStyle = getStyle;
		vm.results = BeerFactory.results;
		vm.cats = BeerFactory.cats;
		vm.styles = BeerFactory.styles;
		vm.goHome = goHome;
		$scope.isCollapsed = true;

		// Functions List

		function searchBeer(s) {
			BeerFactory.searchBeer(s).then(function() {
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

		function goHome() {
			$state.go('Home');
		}

	}
})();
