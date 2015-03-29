angular.module('starter.controllers')

.controller('ExpenseCtrl', ['$scope', '$ionicPopup', function($scope, $ionicPopup) {

	$scope.addExpense = function() {
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
		// TODO: Get from DB instead of hardcoded
		$scope.categories = [
			{
				"id":0,
				"description":"Uncategorized"
			},
			{
				"id":1,
				"description":"Fabric"
			},
			{
				"id":2,
				"description":"Thread"
			},
			{
				"id":3,
				"description":"Pattern"
			},
			{
				"id":4,
				"description":"Misc"
			}
		];
		resetExpense();
	}

	ctrlSetup();
}]);
