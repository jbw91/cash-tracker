angular.module('starter.controllers')

.controller('SummaryCtrl', ['$scope', '$cordovaSQLite', '$rootScope', 'Categories', function($scope, $cordovaSQLite, $rootScope, Categories) {
	$scope.getCategories = function() {
		Categories.getCategories().then(function(data) {
			$scope.results = data;
		});
	};

	var options = {
		//Boolean - Whether we should show a stroke on each segment
		segmentShowStroke : true,

		//String - The colour of each segment stroke
		segmentStrokeColor : "#fff",

		//Number - The width of each segment stroke
		segmentStrokeWidth : 2,

		//Number - The percentage of the chart that we cut out of the middle
		percentageInnerCutout : 80, // This is 0 for Pie charts

		//Number - Amount of animation steps
		animationSteps : 50,

		// String - Animation easing effect
		// Possible effects are:
		// [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
		//  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
		//  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
		//  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
		//  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
		//  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
		//  easeOutElastic, easeInCubic]
		//String - Animation easing effect
		animationEasing : "easeInCubic",

		//Boolean - Whether we animate the rotation of the Doughnut
		animateRotate : true,

		//Boolean - Whether we animate scaling the Doughnut from the centre
		animateScale : false,

		//String - A legend template
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div class=\"color-dot\" style=\"background-color:<%=segments[i].fillColor%>\"></div><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
	};

	// TODO: When changing data, you need to do a scope.apply
	// TODO: Have maybe 7 pre-defined colors, and up to 6 categories can use them, the 6 biggest. All others will be grouped into "Other" for the 7th color.

	var chart1 = "#F7464A";
	var chart1Light = "#FF5A5E";
	var chart2 = "#46BFBD";
	var chart2Light = "#5AD3D1";
	var chart3 = "#FDB45C";
	var chart3Light = "#FFC870";
	var chart4 = "#46EA8F";
	var chart4Light = "#49F5B7";
	var chart5 = "#874DAA";
	var chart5Light = "#8766AA";
	var chart6 = "#F1EC6A";
	var chart6Light = "#F1EC95";
	var chart7 = "#7C95F1";
	var chart7Light = "#7CB1F1";

	$scope.data = [
		{
			value: 300,
			color:chart1,
			highlight:chart1Light,
			label: "Red"
		}
	];

	var ctx = document.getElementById("myChart").getContext("2d");

	var myDoughnutChart = new Chart(ctx).Doughnut($scope.data,options);
	document.getElementById('chartLegend').innerHTML = myDoughnutChart.generateLegend();

	$scope.changeTransactionType = function(type) {
		$scope.transactionType = type;
	};

	function ctrlSetup() {
		$scope.transactionType = 1;

	}

	ctrlSetup();
}]);
