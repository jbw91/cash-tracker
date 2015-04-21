angular.module('starter.controllers')

.controller('CategoriesCtrl', ['$scope', '$ionicPopup', 'Categories', '$rootScope', '$ionicModal', function($scope, $ionicPopup, Categories, $rootScope, $ionicModal) {
	function cleanCategory() {
		$scope.newCategory = {
			"description":"",
			"transactionType":""
		};
	}

	$scope.addCategory = function() {
		if($scope.newCategory.transactionType === "") {
			$ionicPopup.alert({
				title: 'Error',
				template: 'Please select a transaction type.'
			});
		}
		else {
			Categories.createCategory($scope.newCategory).then(function(data) {
				$rootScope.categories.push(data);
				cleanCategory();
				$scope.closeModal();
			});
		}
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
		cleanCategory();
	});

	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
		// Execute action
		cleanCategory();
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
		cleanCategory();
		Categories.getCategories().then(function(data) {
			$rootScope.categories = data;
		});
	}

	ctrlSetup();
}]);
