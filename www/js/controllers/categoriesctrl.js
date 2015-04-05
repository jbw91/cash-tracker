angular.module('starter.controllers')

.controller('CategoriesCtrl', ['$scope', '$ionicPopup', 'Categories', '$rootScope', function($scope, $ionicPopup, Categories, $rootScope) {
	$scope.addCategory = function() {
		Categories.createCategory($scope.newCategory).then(function(data) {
			$rootScope.categories.push(data);
		});
	};

	$scope.deleteCategory = function(id) {
		Categories.deleteCategory(id).then(function() {
			for(var i = 0; i < $rootScope.categories.length; i++) {
				if($rootScope.categories[i].id === id) {
					$rootScope.categories.splice(i,1);
					break;
				}
			}
		});
	};

	function ctrlSetup() {
		Categories.getCategories().then(function(data) {
			$rootScope.categories = data;
		});
	}

	ctrlSetup();
}]);
