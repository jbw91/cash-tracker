angular.module('starter.services')

.factory('Categories', ['$cordovaSQLite', '$rootScope', '$q', function Categories($cordovaSQLite, $rootScope, $q) {
	return {
		getCategories: function() {
			var defer = $q.defer();
			var query = "SELECT id, description FROM category";
			var results = [];
			$cordovaSQLite.execute($rootScope.db, query, []).then(function(data) {
				if(data.rows.length > 0) {
					for (var i = 0; i < data.rows.length; i++) {
						results.push(data.rows.item(i));
						console.log(data.rows.item(i));
					}
				} else {
					console.log("No results found");
				}
				defer.resolve(results);
			}, function (err) {
				console.error(err);
				var error = [{'id':0,'description':'Error'}];
				defer.resolve(error);
			});
			return defer.promise;

			// FOR TESTING IN BROWSER
			// var defer = $q.defer();
			//
			// var results = [
			// 	{id:1,"description":"Thread"},
			// 	{id:2,"description":"Fabric"},
			// 	{id:3,"description":"Uncategorized"},
			// 	{id:4,"description":"Food"}
			// ];
			//
			// defer.resolve(results);
			//
			// return defer.promise;
		},
		createCategory: function(cat) {
			var defer = $q.defer();

			var query = "INSERT INTO category (description) VALUES (?)";
			$cordovaSQLite.execute($rootScope.db, query, [cat]).then(function(data) {
				var newCategory = {
					"id":data.insertId,
					"description":cat
				};
				defer.resolve(newCategory);
			}, function (err) {
				console.error(err);
				defer.resolve();
			});

			return defer.promise;

			// FOR TESTING IN BROWSER
			// var defer = $q.defer();
			//
			// var newCategory = {
			// 	"id":10,
			// 	"description":cat
			// };
			//
			// defer.resolve(newCategory);
			//
			// return defer.promise;
		},
		deleteCategory: function(catId) {
			var defer = $q.defer();

			var query = "DELETE FROM category WHERE id=?";
			$cordovaSQLite.execute($rootScope.db, query, [catId]).then(function(data) {
				defer.resolve();
			}, function (err) {
				console.error(err);
				defer.resolve();
			});

			return defer.promise;
		}
	};
}]);
