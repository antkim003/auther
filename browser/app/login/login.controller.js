app.controller('LoginCtrl', function($http, $scope, $location, AuthFactory, $state,$rootScope) {
  $scope.submitForm = function() {
    var data = {
      email: $scope.email,
      password: $scope.password
    }; 
    AuthFactory.login(data)
      .then(function(response) {
        app.value('currentUser', response.data);
        $rootScope.currentUser = response.data;
        $location.path('/stories');
      })
      .catch(function(err) {
        console.error('there was an error', err);
        $location.path('/error');
      });
  }

});