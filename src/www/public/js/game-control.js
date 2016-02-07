var app = angular.module('boxxleApp', []);
app.controller('gameCtrl', function($scope, $element, $http) {
    var el = angular.element(document.querySelector('#gameBoard'));
	var game;
	$http.get('/data').then( function(res) {
		console.log(res.data.data);
		console.log("HTTP GET JUST HAPPENED");
		game = createBoxxer(el, res.data.data);
		game.onDone = onDone;
	});

	function onDone(endData) {
			$scope.saving = true;
			$http.post('/data', endData).then(function(res){
				console.log("HTTP POST JUST HAPPENED");
				var newLevel = res.data;
				console.log("CONSOLE LOGGING FROM GAME-CONTROL:", newLevel.data);
				$scope.saving = false;
				el.innerHTML="";
				game = createBoxxer($element, newLevel.data );
				game.onDone = onDone;
			}, function(err){ console.log(err); } );

			$scope.game = game;
		}

});
