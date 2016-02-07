var app = angular.module( 'myApp', ['ngRoute']);
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
			controller: 'gameCtrl'
		})
		.when('/rooms', {
			templateUrl: 'boxxle/rooms.html'
			//controller:
		})
		.otherwise({
			redirectTo: '/'
			//controller:
		});
}]);
