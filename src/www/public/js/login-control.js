/*
 * Checks CLICKABLE paths thats route
 * within same page routes for a jwt token
 */
angular.module('myApp').controller('loginCtrl', function($scope, $window, $location) {
    $scope.checkToken = function() {
        //checking for a signed user token
        var jwt = localStorage.getItem('token');
        if (jwt) {
            $window.location.href = '/play?token=' + jwt;
        } else {
            $location.path('/login');
            console.log('no token');
        }
    }

    $scope.roomToken = function() {
        //checking for a signed user token
        var jwt = localStorage.getItem('token');
        if (jwt) {
            $location.path('/rooms');
        } else {
            $location.path('/login');
            console.log('no token');
        }
    }
    $scope.logout = function() {
    localStorage.removeItem('token');
    }
});
