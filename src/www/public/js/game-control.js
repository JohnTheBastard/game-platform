/* global angular */
    var difficulty = JSON.parse(localStorage.getItem("Difficulty"));
    var scores = JSON.parse(localStorage.getItem("Scores"));

    var app = angular.module('boxxleApp', [])

    app.controller('gameCtrl', function($scope, $element) {
      $scope.game = createBoxxer($element);
      console.log($scope.game.user.currentLevel);
      console.log($scope.game.user);
    //  $scope.stepCount = 0 || $scope.game.game.sprite ;
    });

    app.controller('mainCtrl', function($scope) {
        $scope.difficulty = difficulty;
        $scope.level = JSON.parse(localStorage.getItem("Level"));
        $scope.$watch('level', function() {
          $scope.level = JSON.parse(localStorage.getItem("Level"))
        });
    });
