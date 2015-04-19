// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope, $cordovaStatusbar, Categories, Transactions) {
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

		$rootScope.db = window.sqlitePlugin.openDatabase({name: "populated.db", location: 2, createFromLocation: 1});

		$rootScope.transactionTypes = [
			{"id":1,"description":"Income"},
			{"id":2,"description":"Expense"}
		];
		Categories.getCategories().then(function(data) {
			$rootScope.categories = data;

			Transactions.getTransactions().then(function(data) {
				$rootScope.transactions = data;
			});

			// $rootScope.transactions = [{
			// 	"id":5000,
			// 	"transactionTypeId":1, // 1 is the ID for an income transaction.
			// 	"amount":1.34,
			// 	"date":"3-MAR-2015",
			// 	"item":"Stuff",
			// 	"category":$rootScope.categories[0]
			// }];
		});

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
