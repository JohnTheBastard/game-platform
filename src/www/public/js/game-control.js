var boxApp = angular.module('boxxleApp', []);
boxApp.controller('gameCtrl', function($scope, $element, $http) {
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
boxApp.controller('guestCtrl', function($scope, $element, $http) {
  var el = angular.element(document.querySelector('#gameBoard'));
	$scope.guestGame = createBoxxer(el);
});
