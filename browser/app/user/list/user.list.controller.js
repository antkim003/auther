'use strict';

app.controller('UserListCtrl', function ($scope, users, User, $rootScope) {
	$scope.users = users;
	if ($scope.currentUser) {
		if ($scope.isAdmin) {
			$scope.isAdmin = $scope.currentUser.isAdmin;
		} else {
			$scope.isAdmin = false;
		}
	} 
	$scope.addUser = function () {
		$scope.userAdd.save()
		.then(function (user) {
			$scope.userAdd = new User();
			$scope.users.unshift(user);
		});
	};
	
	$scope.userSearch = new User();

	$scope.userAdd = new User();
});