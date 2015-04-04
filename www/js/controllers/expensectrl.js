angular.module('starter.controllers')

.controller('ExpenseCtrl', ['$scope', '$ionicPopup', 'Categories', function($scope, $ionicPopup, Categories) {

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
			"category":$scope.categories[0]
		};
	}

	// Set up controller initially
	function ctrlSetup() {
		Categories.getCategories().then(function(data) {
			$scope.categories = data;

			resetExpense();
		});
	}

	ctrlSetup();
}]);
