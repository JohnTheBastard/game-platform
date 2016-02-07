var app = angular.module( 'myApp', ['ngRoute','btford.socket-io']);
app.factory('socket', function(socketFactory) {
	var myRoomSocket = io('/rooms');
	mySocket = socketFactory({
		ioSocket: myRoomSocket
	});
	return mySocket;
});
app.config( [ '$routeProvider', function( $routeProvider ) {
	$routeProvider
		.when('/', {
			templateUrl: 'boxxle/main.html',
			controller: 'loginCtrl'
		})
		.when('/login', {
			templateUrl: 'boxxle/login.html',
		})
		.when('/about', {
			templateUrl: 'boxxle/about.html'
		})
		.when('/play', {
			templateUrl: 'boxxle/play.html',
			controller: 'gameCtrl'
		})
		.when('/guest', {
			templateUrl: 'boxxle/guestplay.html',
			controller: 'guestCtrl'
		})
		.when('/rooms', {
			templateUrl: 'boxxle/rooms.html',
			controller: 'roomCtrl'
		})
		.otherwise({
			redirectTo: '/'
			//controller:
		});
}]);
