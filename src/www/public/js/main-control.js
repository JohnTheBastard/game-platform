var app = angular.module( 'myApp', ['ngRoute','controllers']);
var controllers = angular.module( 'controllers', [] );

app.config( [ '$routeProvider', function( $routeProvider ) {
	$routeProvider
		.when('/', {
			templateUrl: 'boxxle/main.html',
			//controller:
		})
		.when('/login', {
			templateUrl: 'boxxle/login.html',
			//controller:
		})
		.when('/about', {
			templateUrl: 'boxxle/about.html',
			//controller:
		})
		.when('/play', {
			templateUrl: 'boxxle/play.html',
			controller: 'gameCtrl'
		})
		.when('/guest', {
			templateUrl: 'boxxle/guestplay.html',
			//controller:
		})
		.when('/rooms', {
			templateUrl: 'boxxle/rooms.html',
			//controller:
		})
		.otherwise({
			redirectTo: '/'
			//controller:
		});
}]);
