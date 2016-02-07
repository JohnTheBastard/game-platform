var app = angular.module('myApp', ['ngRoute', 'btford.socket-io']);
app.factory('socket', function(socketFactory) {
    var myRoomSocket = io('/rooms');
    mySocket = socketFactory({
        ioSocket: myRoomSocket
    });
    return mySocket;
});
window.routes = {
    '/': {
        templateUrl: 'boxxle/main.html',
        controller: 'loginCtrl',
        authRequired: false
    },
    '/login': {
        templateUrl: 'boxxle/login.html',
        authRequired: false
    },
    '/about': {
        templateUrl: 'boxxle/about.html',
        authRequired: false
    },
    '/play': {
        templateUrl: 'boxxle/play.html',
        authRequired: true
    },
    '/guest': {
        templateUrl: 'boxxle/guestplay.html',
        authRequired: false
    },
    '/rooms': {
        templateUrl: 'boxxle/rooms.html',
        controller: 'roomCtrl',
        authRequired: true
    }
};
/*
 * Checks paths that could be manually navigated to for a jwt token
 */
app.config(['$routeProvider', function($routeProvider) {
    for (var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    };
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]).run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next) {
        var jwt = localStorage.getItem('token');
        for (var i in window.routes) {
            if (next.indexOf(i) != -1) {
                if (window.routes[i].authRequired && !jwt) {
                    console.log('no token');
                    event.preventDefault();
                }
            }
        }
    });
});
