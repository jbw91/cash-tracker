angular.module('starter.controllers')

.controller('ExpenseCtrl', ['$scope', '$ionicPopup', 'Categories', '$rootScope', function($scope, $ionicPopup, Categories, $rootScope) {

	$scope.addExpense = function() {
		//TODO: Actually add expense to DB
		$ionicPopup.alert({
			title: 'Success',
			template: 'Added expense.'
		});
		resetExpense();
	};

	function resetExpense() {
		$scope.expense = {
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

			resetExpense();
		});
	}

	ctrlSetup();
}]);
