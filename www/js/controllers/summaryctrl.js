angular.module('starter.controllers')

.controller('SummaryCtrl', ['$scope', '$cordovaSQLite', '$rootScope', 'Categories', function($scope, $cordovaSQLite, $rootScope, Categories) {
	$scope.getCategories = function() {
		Categories.getCategories().then(function(data) {
			$scope.results = data;
		});
	};
}]);
