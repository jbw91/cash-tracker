angular.module('starter.controllers')

.controller('IncomeCtrl', ['$scope', '$ionicPopup', 'Categories', '$rootScope', 'Transactions', '$filter', function($scope, $ionicPopup, Categories, $rootScope, Transactions, $filter) {

	$scope.addIncome = function() {
		var t = angular.copy($scope.income);
		t.date = $filter('date')(t.date,'MMM dd, yyyy');
		Transactions.createTransaction(t).then(function(data) {
			$rootScope.transactions.push(data);

			$ionicPopup.alert({
				title: 'Success',
				template: 'Added income.'
			});

			resetIncome();
		});
	};

	function resetIncome() {
		$scope.income = {
			"id":0,
			"transactionTypeId":1, // 1 is the ID for an income transaction.
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

			resetIncome();
		});
	}

	ctrlSetup();
}]);
