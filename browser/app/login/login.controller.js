app.controller('LoginCtrl', function($http, $scope, $location) {
  $scope.submitForm = function() {
    var data = {
      email: $scope.email,
      password: $scope.password
    }; 
    AuthFactory.login('/login', data)
      .then(function(resp) {
        $location.path('/stories');
      })
      .catch(function(err) {
        console.error('there was an error', err);
        $location.path('/error');
      });
  }

});