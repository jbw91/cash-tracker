angular.module('starter.controllers')

.controller('ExpenseCtrl', ['$scope', '$ionicPopup', 'Categories', '$rootScope', '$filter', 'Transactions', function($scope, $ionicPopup, Categories, $rootScope, $filter, Transactions) {

	$scope.addExpense = function() {
		var t = angular.copy($scope.expense);
		t.date = $filter('date')(t.date,'MMM dd, yyyy');
		Transactions.createTransaction(t).then(function(data) {
			$rootScope.transactions.push(data);

			$ionicPopup.alert({
				title: 'Success',
				template: 'Added expense.'
			});

			resetExpense();
		});
	};

	function resetExpense() {
		$scope.expense = {
			"id":0,
			"transactionType": {
				"id":2, // 1 is the ID for an expense transaction.
				"description":"Expense"
			},
			"amount":null,
			"date":null,
			"item":null,
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
