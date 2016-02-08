var app = angular.module('myApp', ['ngRoute', 'btford.socket-io']);

app.factory('socket', function(socketFactory) {
    var myRoomSocket = io('/rooms');
    mySocket = socketFactory({
        ioSocket: myRoomSocket
    });
    return mySocket;
});


//Setup '.when' routes attached to browser window obj
window.routes = {
    '/': {
        templateUrl: 'boxxle/main.html',
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
        templateUrl: 'boxxle/play2.html',
        authRequired: false
    },
    '/rooms': {
        templateUrl: 'boxxle/rooms.html',
        controller: 'roomCtrl',
        authRequired: true
    }
};

//Checks paths that could be manually navigated to for a jwt token
app.config(['$routeProvider', function($routeProvider) {
    for (var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    };
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]).run(function($rootScope) {

    //listen for nav changes in $rootScope
    $rootScope.$on("$locationChangeStart", function(event, next) {


      // next - the route getting navigated to
      // event - the $locationChangeStart object
        var jwt = localStorage.getItem('token');
        for (var ii in window.routes) {

        // check the authRequired true/false values with indexOf
            if (next.indexOf(ii) != -1) {
                if (window.routes[ii].authRequired && !jwt) {
                    event.defaultPrevented = true;
                }
            }
        }
    });
});
angular.module('myApp').controller('gameCtrl', function($scope, $element, $http) {
    var el = angular.element(document.querySelector('#gameBoard'));
	var game;

	$http.get('/data').then( function(res) {
		console.log(res.data.data);
		game = createBoxxer(el, res.data.data);
		game.onDone = onDone;
	});


	function onDone(endData) {
			$scope.saving = true;
			$http.post('/data', endData).then(function(res){
				var newLevel = res.data;
				$scope.saving = false;
				el.innerHTML="";
				game = createBoxxer($element, newLevel.data );
				game.onDone = onDone;
			}, function(err){ console.log(err); } );

			$scope.game = game;
		}

});
