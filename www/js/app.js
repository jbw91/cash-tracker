// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filters', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope, $cordovaStatusbar, Categories, Transactions, $http, $cordovaAppVersion) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
		$cordovaStatusbar.style(1);

		// Find out what device user is on
		$rootScope.device = device.platform;
		//TODO: Create functionality to rate app in each device store once published

		$cordovaAppVersion.getAppVersion().then(function (version) {
			$rootScope.version = version;
		});

		$rootScope.db = window.sqlitePlugin.openDatabase({name: "populated.db", location: 2, createFromLocation: 1});

		$rootScope.transactionTypes = [
			{"id":1,"description":"Income"},
			{"id":2,"description":"Expense"}
		];
		Categories.getCategories().then(function(data) {
			$rootScope.categories = data;

			Transactions.getTransactions().then(function(data) {
				$rootScope.transactions = data;
				// $rootScope.transactions = [];
			});
		});

		function setGlobalChartSettings() {
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
		}

		setGlobalChartSettings();

	});
})

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
		url: "/tab",
		abstract: true,
		templateUrl: "templates/tabs.html"
	})

	// Each tab has its own nav history stack:

	.state('tab.summary', {
		url: '/summary',
		views: {
			'tab-summary': {
				templateUrl: 'templates/tab-summary.html',
				controller: 'SummaryCtrl'
			}
		}
	})

	.state('tab.income', {
		url: '/income',
		views: {
			'tab-income': {
				templateUrl: 'templates/tab-income.html',
				controller: 'IncomeCtrl'
			}
		}
	})

	.state('tab.expense', {
		url: '/expense',
		views: {
			'tab-expense': {
				templateUrl: 'templates/tab-expense.html',
				controller: 'ExpenseCtrl'
			}
		}
	})

	.state('tab.settings', {
		url: '/settings',
		views: {
			'tab-settings': {
				templateUrl: 'templates/tab-settings.html',
				controller: 'SettingsCtrl'
			}
		}
	})

	.state('tab.settings-about', {
		url: '/settings/about',
		views: {
			'tab-settings': {
				templateUrl: 'templates/about.html',
				controller: 'SettingsCtrl'
			}
		}
	})

	.state('tab.settings-categories', {
		url: '/settings/categories',
		views: {
			'tab-settings': {
				templateUrl: 'templates/tab-settings-categories.html',
				controller: 'CategoriesCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/summary');

});
