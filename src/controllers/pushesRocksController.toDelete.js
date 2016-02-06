var app = angular.module('boxxleApp', []);


app.controller('gameCtrl', function($scope, $element, $http) {
    var el = angular.element(document.querySelector('#gameBoard')); 
	var game;
	$http.get('/data').then(res => {
		game = createBoxxer(el, res.data);

		game.onDone = onDone;
	});
	
	function onDone(endData) {		
			$scope.saving = true;
			$http.post('/data', endData).then(function(res){
				//console.log(res.data);
				var newLevel = res.data;
				$scope.saving = false;
				el.innerHTML="";
				game = createBoxxer($element, getLevel(newLevel) );
				game.onDone = onDone;
			}, function(err){ console.log(err); } );

			$scope.game = game;
		}
    
});
