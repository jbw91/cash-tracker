angular.module('starter.controllers')

.controller('SettingsCtrl', ['$scope', 'Categories', function($scope, Categories) {
	$scope.addCategory = function() {
		Categories.createCategory($scope.newCategory).then(function(data){
			$scope.categories.push(data);
		});
	};

	function ctrlSetup() {
		Categories.getCategories().then(function(data) {
			$scope.categories = data;
		});
	}

	ctrlSetup();
}]);
