angular.module('starter.controllers')

.controller('IncomeCtrl', ['$scope', '$ionicPopup', 'Categories', '$rootScope', function($scope, $ionicPopup, Categories, $rootScope) {

	$scope.addIncome = function() {
		//TODO: Actually add income to DB
		$ionicPopup.alert({
			title: 'Success',
			template: 'Added income.'
		});
		resetIncome();
	};

	function resetIncome() {
		$scope.income = {
			"id":0,
			"amount":null,
			"date":null,
			"item":"",
			"category":$rootScope.categories[0]
		};
	}

	// Set up controller initially
	function ctrlSetup() {
		Categories.getCategories().then(function(data) {
			$rootScope.categories = data;

			resetIncome();
		});
	}

	ctrlSetup();
}]);
