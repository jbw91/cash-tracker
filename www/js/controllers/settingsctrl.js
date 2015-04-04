angular.module('starter.controllers')

.controller('SettingsCtrl', ['$scope', 'Categories', '$rootScope', function($scope, Categories, $rootScope) {
	$scope.addCategory = function() {
		Categories.createCategory($scope.newCategory).then(function(data){
			$rootScope.categories.push(data);
		});
	};

	function ctrlSetup() {
		Categories.getCategories().then(function(data) {
			$rootScope.categories = data;
		});
	}

	ctrlSetup();
}]);
