var boxApp = angular.module('boxxleApp', []);
boxApp.controller('gameCtrl', function($scope, $element, $http) {
    var anchor = $element.find('[data-gameBoard]');
    var game;

    $scope.difficulty = 'easy';
    $scope.level = 1;
    $scope.stepCount = 0;

    $http.get('/data').then( function(res) {
        //console.log("res, res.data:", res, res.data);
        game = new GameInstance( anchor, res.data.data );
        game.onDone = onDone;
        game.updateStepCount = updateStepCount;
    });
    
    function updateStepCount( count ) {
        $scope.stepCount = count;
        $scope.$apply();
    }
    
    function onDone( endData ) {
        $scope.saving = true;
        $http.post('/data', endData).then(function(res){
            var newLevel = res.data;
            $scope.saving = false;
            anchor.innerHTML="";
            game.destroy();
            game = new GameInstance( anchor, newLevel.data );
            game.onDone = onDone;
            game.updateStepCount = updateStepCount;
        }, function(err){ console.log(err); } );

        $scope.game = game;
    }

});
