angular.module('starter.controllers')

.controller('SettingsCtrl', ['$scope', 'Categories', '$rootScope', '$window', '$ionicPopup', function($scope, Categories, $rootScope, $window, $ionicPopup) {
	$scope.giveFeedback = function() {
		cordova.plugins.email.open({
			to: 'woodruffapps@gmail.com',
			subject: 'Cash Tracker Feedback'
		}, function() {
			$ionicPopup.alert({
				title: 'Thank You',
				template: 'Your feedback has been sent to the developer.'
			});
		}, this);
	};
}]);
