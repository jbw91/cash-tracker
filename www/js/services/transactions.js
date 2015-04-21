angular.module('starter.services')

.factory('Transactions', ['$cordovaSQLite', '$rootScope', '$q', function Transactions($cordovaSQLite, $rootScope, $q) {
	return {
		getTransactions: function() {
			var defer = $q.defer();
			var query = "SELECT * FROM itemtransaction";
			var results = [];
			$cordovaSQLite.execute($rootScope.db, query, []).then(function(data) {
				// TODO: Convert fields such as "transactiondate" to correct field name "date"
				if(data.rows.length > 0) {
					for (var i = 0; i < data.rows.length; i++) {
						var t = {};
						t.id = data.rows.item(i).id;
						t.transactionType = {};
						t.transactionType.id = data.rows.item(i).transactiontypeid;
						if(t.transactionType.id === 1) {
							t.transactionType.description = "Income";
						}
						else {
							t.transactionType.description = "Expense";
						}
						t.amount = data.rows.item(i).amount;
						t.date = data.rows.item(i).transactiondate;
						t.item = data.rows.item(i).item;
						t.category = {};
						t.category.id = data.rows.item(i).categoryid;
						for(var j = 0; j < $rootScope.categories.length; j++) {
							if($rootScope.categories[j].id === t.category.id) {
								t.category.description = $rootScope.categories[j].description;
							}
						}
						results.push(t);
					}
				} else {
					// No results found
				}
				defer.resolve(results);
			}, function (err) {
				console.error(err);
				var error = [{'id':0,'description':'Error'}];
				defer.resolve(error);
			});
			return defer.promise;
		},
		createTransaction: function(transaction) {
			var defer = $q.defer();

			var insertValues = [
				transaction.transactionType.id,
				transaction.amount,
				transaction.date,
				transaction.category.id,
				transaction.item
			];

			var query = "INSERT INTO itemtransaction (transactiontypeid,amount,transactiondate,categoryid,item) VALUES (?,?,?,?,?)";
			$cordovaSQLite.execute($rootScope.db, query, insertValues).then(function(data) {
				transaction.id = data.insertId;
				defer.resolve(transaction);
			}, function (err) {
				console.error(err);
				defer.resolve();
			});

			return defer.promise;
		},
		deleteTransaction: function(transactionId) {
			var defer = $q.defer();

			var query = "DELETE FROM itemtransaction WHERE id=?";
			$cordovaSQLite.execute($rootScope.db, query, [transactionId]).then(function(data) {
				defer.resolve();
			}, function (err) {
				console.error(err);
				defer.resolve();
			});

			return defer.promise;
		}
	};
}]);
