app.factory('AuthFactory',function($http) {
  var auth = {};
  auth.login = function(data) {
    return $http.post('/login', data);
  };

  auth.signup = function(data) {
    return $http.post('api/users/',data);
  };

  auth.logout = function() {
    return $http.get('/logout');
  }

  auth.me = function() {
    return $http.get('/auth/me');
  }
  return auth;

});