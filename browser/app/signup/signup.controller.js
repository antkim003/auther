app.controller('SignupCtrl', function($scope, AuthFactory, $location) {
  $scope.submitSignupForm = function() {
    var data = {
      email: $scope.email,
      password: $scope.password
    };
    AuthFactory.signup(data)
      .then(function(response) {
        $location.path('/users/' + response.data._id);
      })
      .catch(function(err) {
        $location.path('/error');
      });
  }
});