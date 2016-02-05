var app = angular.module('myApp', []);

app.controller('loginCtrl', function($scope, $window) {
    $scope.count = 0;
    $scope.test = 'foo';
      $scope.checkToken = function () {
        console.log('hi');
                var jwt = localStorage.getItem('token');
                if (jwt) {
                  $window.location.href = '/play?token=' + jwt;
                  } else {
                    $window.location.href = '/login'
                    console.log('no token');
                }
              }
});
