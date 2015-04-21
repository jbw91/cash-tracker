angular.module('starter.filters')

.filter('transactionTypeFilter', function() {
	return function(list, param) {
		if(!param || !list) {
			return;
		}
		var newList = [];
		for(var i = 0; i < list.length; i++) {
			// Check transaction type. 1 = Income, 2 = Expense, 0 = Both
			if(list[i].transactionType.id === param || list[i].transactionType.id === 0) {
				newList.push(list[i]);
			}
		}
		return newList;
	};
});
