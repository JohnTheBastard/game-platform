angular.module('myApp').controller('loginCtrl', function($scope, $window) {
    $scope.checkToken = function () {
                var jwt = localStorage.getItem('token');
                if (jwt) {
                  $window.location.href = '/play?token=' + jwt;
                  } else {
                    $window.location.href = '/login'
                    console.log('no token');
                }
        }
});
