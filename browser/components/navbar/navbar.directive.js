'use strict';

app.directive('navbar', function ($state, $location, AuthFactory, $rootScope) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		link: function (scope) {
			scope.pathStartsWithStatePath = function (state) {
				var partial = $state.href(state);
				var path = $location.path();
				return path.startsWith(partial);
			};

			scope.logout = function() {
				AuthFactory.logout()
					.then(function(resp) {
						$location.path('/')
					})
					.catch(function() {
						console.log("dont do anything because we couldn't log out" );
					});
			}


			AuthFactory.me()
				.then(function(resp) {
					$rootScope.currentUser = resp.data;
				});
		}
	}
});