var app = angular.module( 'myApp', ['ngRoute','btford.socket-io']);
app.factory('socket', function(socketFactory) {
	var myRoomSocket = io('/rooms');
	mySocket = socketFactory({
		ioSocket: myRoomSocket
	});
	return mySocket;
});
app.config( [ '$routeProvider', function($routeProvider) {
	for(var path in window.routes) {
			 $routeProvider.when(path, window.routes[path]);
	 }
	 $routeProvider.otherwise({redirectTo: '/'});
}])
window.routes = {
    '/': {
        templateUrl: 'boxxle/main.html',
        controller: 'loginCtrl',
				requireLogin: false
    },
    '/login': {
        templateUrl: 'boxxle/login.html',
				requireLogin: false
    },
    '/about': {
        templateUrl: 'boxxle/about.html',
				requireLogin: false
    },
    '/play': {
        templateUrl: 'boxxle/play.html',
				requireLogin: true
    },
    '/guest': {
        templateUrl: 'boxxle/guestplay.html',
        requireLogin: false
    },
    '/rooms': {
        templateUrl: 'boxxle/rooms.html',
        controller: 'roomCtrl',
				requireLogin: true
    }
};

// angular.module('MyApp',['authServices']).service('SessionService', function(){
//     var userIsAuthenticated = false;
//     this.setUserAuthenticated = function(value){
//         userIsAuthenticated = value;
//     };
//     this.getUserAuthenticated = function(){
//         return userIsAuthenticated;
//     }
//   });

// .run(function($rootScope){
//     $rootScope.$on("$locationChangeStart", function(event, next, current, SessionService) {
//         for(var i in window.routes) {
//             if(next.indexOf(i) != -1) {
//                 if(window.routes[i].requireLogin && !SessionService.getUserAuthenticated()) {
//                     alert("You need to be authenticated to see this page!");
//                     event.preventDefault();
//                 }
//             }
//         }
//     });
// });
