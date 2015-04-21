angular.module('starter.controllers')

.controller('IncomeCtrl', ['$scope', '$ionicPopup', 'Categories', '$rootScope', 'Transactions', '$filter', function($scope, $ionicPopup, Categories, $rootScope, Transactions, $filter) {

	$scope.addIncome = function() {
		if($scope.income.category === "") {
			$ionicPopup.alert({
				title: 'Error',
				template: 'Please select a category.'
			});
		}
		else {
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
		}
	};

	function resetIncome() {
		$scope.income = {
			"id":0,
			"transactionType": {
				"id":1, // 1 is the ID for an income transaction.
				"description":"Income"
			},
			"amount":null,
			"date":null,
			"item":null,
			"category":""
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
