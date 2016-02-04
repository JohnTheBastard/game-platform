/* global angular */
    var difficulty = JSON.parse(localStorage.getItem("Difficulty"));
    var scores = JSON.parse(localStorage.getItem("Scores"));

    var app = angular.module('boxxleApp', []);


    app.controller('gameCtrl', function($scope, $element) {
      var el = angular.element(document.querySelector('#gameBoard'));
      $scope.game = createBoxxer(el);
      $scope.level = $scope.game.user.currentLevel;
      $scope.difficulty = $scope.game.user.difficulty;
      $scope.steps = $scope.game.user.difficulty;
      // $scope.$watch('level', function(newValue, oldValue) {
      //   console.log('something changed!');
      //   console.log(newValue);
      //   $scope.level = $scope.game.user.currentLevel;
      // });
    });
