angular.module('starter.services')

.factory('Categories', ['$cordovaSQLite', '$rootScope', '$q', function Categories($cordovaSQLite, $rootScope, $q) {
	return {
		getCategories: function() {
			// var defer = $q.defer();
			// var query = "SELECT id, description, transactiontypeid FROM category";
			// var results = [];
			// $cordovaSQLite.execute($rootScope.db, query, []).then(function(data) {
			// 	if(data.rows.length > 0) {
			// 		for (var i = 0; i < data.rows.length; i++) {
			// 			var c = {};
			// 			c.id = data.rows.item(i).id;
			// 			c.description = data.rows.item(i).description;
			// 			c.transactionType = {};
			// 			c.transactionType.id = data.rows.item(i).transactiontypeid;
			// 			if(c.transactionType.id === 1) {
			// 				c.transactionType.description = "Income";
			// 			}
			// 			else if(c.transactionType.id === 2) {
			// 				c.transactionType.description = "Expense";
			// 			}
			// 			else {
			// 				c.transactionType.description = "Both";
			// 			}
			// 			results.push(c);
			// 		}
			// 	} else {
			// 		// No results found
			// 	}
			// 	defer.resolve(results);
			// }, function (err) {
			// 	console.error(err);
			// 	var error = [{'id':0,'description':'Error'}];
			// 	defer.resolve(error);
			// });
			// return defer.promise;

			// FOR TESTING IN BROWSER
			var defer = $q.defer();

			var results = [
				{
					"id":1,
					"description":"Thread",
					"transactionType":{
						"id":1,
						"description":"Income"
					}
				},
				{
					"id":2,
					"description":"Fabric",
					"transactionType":{
						"id":1,
						"description":"Income"
					}
				},
				{
					"id":3,
					"description":"Uncategorized",
					"transactionType":{
						"id":1,
						"description":"Income"
					}
				},
				{
					"id":4,
					"description":"Food",
					"transactionType":{
						"id":1,
						"description":"Income"
					}
				}
			];

			defer.resolve(results);

			return defer.promise;
		},
		createCategory: function(cat) {
			var defer = $q.defer();

			console.log("Description: " + cat.description);
			console.log("Transaction Type ID: " + cat.transactionType.id);

			var query = "INSERT INTO category (description, transactiontypeid) VALUES (?,?)";
			$cordovaSQLite.execute($rootScope.db, query, [cat.description, cat.transactionType.id]).then(function(data) {
				var newCategory = {
					"id":data.insertId,
					"description":cat.description,
					"transactionType":{
						"id":cat.transactionType.id
					}
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
