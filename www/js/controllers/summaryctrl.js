angular.module('starter.controllers')

.controller('SummaryCtrl', ['$scope', '$cordovaSQLite', '$rootScope', function($scope, $cordovaSQLite, $rootScope) {
	$scope.getCategories = function() {
		var query = "SELECT id, description FROM category";
		$scope.results = [];
		$cordovaSQLite.execute($rootScope.db, query, []).then(function(data) {
			if(data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					$scope.results.push(data.rows.item(i));
					console.log(data.rows.item(i));
				}
			} else {
				console.log("No results found");
			}
		}, function (err) {
			console.error(err);
		});
	};
}]);
