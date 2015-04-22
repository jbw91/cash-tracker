angular.module('starter.controllers')

.controller('SummaryCtrl', ['$scope', '$cordovaSQLite', '$rootScope', 'Categories', function($scope, $cordovaSQLite, $rootScope, Categories) {
	$scope.getCategories = function() {
		Categories.getCategories().then(function(data) {
			$scope.results = data;
		});
	};

	Chart.defaults.global = {
		// Boolean - Whether to animate the chart
		animation: true,

		// Number - Number of animation steps
		animationSteps: 60,

		// String - Animation easing effect
		// Possible effects are:
		// [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
		//  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
		//  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
		//  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
		//  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
		//  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
		//  easeOutElastic, easeInCubic]
		animationEasing: "easeOutQuart",

		// Boolean - If we should show the scale at all
		showScale: true,

		// Boolean - If we want to override with a hard coded scale
		scaleOverride: false,

		// ** Required if scaleOverride is true **
		// Number - The number of steps in a hard coded scale
		scaleSteps: null,
		// Number - The value jump in the hard coded scale
		scaleStepWidth: null,
		// Number - The scale starting value
		scaleStartValue: null,

		// String - Colour of the scale line
		scaleLineColor: "rgba(0,0,0,.1)",

		// Number - Pixel width of the scale line
		scaleLineWidth: 1,

		// Boolean - Whether to show labels on the scale
		scaleShowLabels: true,

		// Interpolated JS string - can access value
		scaleLabel: "<%=value%>",

		// Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
		scaleIntegersOnly: true,

		// Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
		scaleBeginAtZero: false,

		// String - Scale label font declaration for the scale label
		scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

		// Number - Scale label font size in pixels
		scaleFontSize: 12,

		// String - Scale label font weight style
		scaleFontStyle: "normal",

		// String - Scale label font colour
		scaleFontColor: "#666",

		// Boolean - whether or not the chart should be responsive and resize when the browser does.
		responsive: false,

		// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
		maintainAspectRatio: true,

		// Boolean - Determines whether to draw tooltips on the canvas or not
		showTooltips: true,

		// Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
		customTooltips: false,

		// Array - Array of string names to attach tooltip events
		tooltipEvents: ["mousemove", "touchstart", "touchmove"],

		// String - Tooltip background colour
		tooltipFillColor: "rgba(0,0,0,0.8)",

		// String - Tooltip label font declaration for the scale label
		tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

		// Number - Tooltip label font size in pixels
		tooltipFontSize: 14,

		// String - Tooltip font weight style
		tooltipFontStyle: "normal",

		// String - Tooltip label font colour
		tooltipFontColor: "#fff",

		// String - Tooltip title font declaration for the scale label
		tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

		// Number - Tooltip title font size in pixels
		tooltipTitleFontSize: 14,

		// String - Tooltip title font weight style
		tooltipTitleFontStyle: "bold",

		// String - Tooltip title font colour
		tooltipTitleFontColor: "#fff",

		// Number - pixel width of padding around tooltip text
		tooltipYPadding: 6,

		// Number - pixel width of padding around tooltip text
		tooltipXPadding: 6,

		// Number - Size of the caret on the tooltip
		tooltipCaretSize: 8,

		// Number - Pixel radius of the tooltip border
		tooltipCornerRadius: 6,

		// Number - Pixel offset from point x to tooltip edge
		tooltipXOffset: 10,

		// String - Template string for single tooltips
		tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

		// String - Template string for multiple tooltips
		multiTooltipTemplate: "<%= value %>",

		// Function - Will fire on animation progression.
		onAnimationProgress: function(){},

		// Function - Will fire on animation completion.
		onAnimationComplete: function(){}
	};

	var options = {
		//Boolean - Whether we should show a stroke on each segment
		segmentShowStroke : true,

		//String - The colour of each segment stroke
		segmentStrokeColor : "#fff",

		//Number - The width of each segment stroke
		segmentStrokeWidth : 4,

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

	var data = [
		{
			value: 300,
			color:"#F7464A",
			highlight: "#FF5A5E",
			label: "Fabric"
		},
		{
			value: 50,
			color: "#46BFBD",
			highlight: "#5AD3D1",
			label: "Thread"
		},
		{
			value: 100,
			color: "#FDB45C",
			highlight: "#FFC870",
			label: "Ribbon"
		},
		{
			value: 24,
			color: "purple",
			highlight: "purple",
			label: "Food"
		},
		{
			value: 30,
			color: "blue",
			highlight: "blue",
			label: "Parking"
		},
		{
			value: 400,
			color: "yellow",
			highlight: "yellow",
			label: "Events"
		},
		{
			value: 80,
			color: "red",
			highlight: "red",
			label: "Other"
		}
	];

	var ctx = document.getElementById("myChart").getContext("2d");

	var myDoughnutChart = new Chart(ctx).Doughnut(data,options);
	document.getElementById('chartLegend').innerHTML = myDoughnutChart.generateLegend();
}]);
