var app = angular.module('boxxleApp', []);
app.controller('gameCtrl', function($scope) {
    var el = angular.element(document.querySelector('#gameBoard'));
	var game = createBoxxer(el);
    $scope.game = game;
    console.log($scope.game.game);
    
/*
	game.onDone = function(endData) {
		$scope.saving = true;
		$http.post('/data', endData).then(res => {
			var newLevel = res.data;
			$scope.saving = false;
			game = createBoxxer($element, getLevel(newLevel) );
		})
	}
*/
    
/*
    setTimeout(function(){ 
		console.log($scope.game.user);
		console.log($scope.game.user.currentLevel);
	}, 30000);
*/
    
});