angular.module('starter.controllers')

.controller('SummaryCtrl', ['$scope', '$cordovaSQLite', '$rootScope', 'Categories', function($scope, $cordovaSQLite, $rootScope, Categories) {
	$scope.getCategories = function() {
		Categories.getCategories().then(function(data) {
			$scope.results = data;
		});
	};

	$scope.chart = {
		labels : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		datasets : [
			{
				fillColor : "yellow",
				strokeColor : "#e67e22",
				pointColor : "blue",
				pointStrokeColor : "#e67e22",
				data : [4, 3, 5, 4, 6]
			},
			{
				fillColor : "yellow",
				strokeColor : "#f1c40f",
				pointColor : "blue",
				pointStrokeColor : "#f1c40f",
				data : [8, 3, 2, 5, 4]
			}
		],
	};

	//Globals
	$scope.options = {
		// Boolean - Whether to animate the chart
		animation: true,

		// Number - Number of animation steps
		animationSteps: 60,

		// String - Animation easing effect
		animationEasing: "easeOutQuart",

		// Boolean - If we should show the scale at all
		showScale: false,

		// Boolean - whether or not the chart should be responsive and resize when the browser does.
		responsive: true,

		// Boolean - Determines whether to draw tooltips on the canvas or not
		showTooltips: true
	};
}]);
