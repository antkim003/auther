app.factory('AuthFactory',function($http) {
  var auth = {};
  auth.login = function(data) {
    return $http.post('/login', data);
  };

  auth.signup = function(data) {
    return $http.post('api/users/',data);
  };

  return auth;

});