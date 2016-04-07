app.controller('SignupCtrl', function($scope, AuthFactory, $location, $rootScope) {
  $scope.submitSignupForm = function() {
    var data = {
      email: $scope.email,
      password: $scope.password
    };
    AuthFactory.signup(data)
      .then(function(response) {
        app.value('currentUser', response.data);
        $rootScope.currentUser = response.data;
        $location.path('/users/' + response.data._id);
      })
      .catch(function(err) {
        $location.path('/error');
      });
  }
});