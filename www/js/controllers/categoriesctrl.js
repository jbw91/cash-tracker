angular.module('starter.controllers')

.controller('CategoriesCtrl', ['$scope', '$ionicPopup', 'Categories', '$rootScope', '$ionicModal', function($scope, $ionicPopup, Categories, $rootScope, $ionicModal) {
	$scope.addCategory = function() {
		console.log($scope.newCategory);
		Categories.createCategory($scope.newCategory).then(function(data) {
			$rootScope.categories.push(data);
			$scope.newCategory = "";
			$scope.closeModal();
		});
	};

	$ionicModal.fromTemplateUrl('templates/category-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function() {
		$scope.modal.show();
	};

	$scope.closeModal = function() {
		$scope.modal.hide();
	};

	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
		// Execute action
		$scope.newCategory = '';
	});

	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
		// Execute action
		$scope.newCategory = '';
	});

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
		$scope.transactionType = 1;
		Categories.getCategories().then(function(data) {
			$rootScope.categories = data;
		});
	}

	ctrlSetup();
}]);
