/* global angular */
    var difficulty = JSON.parse(localStorage.getItem("Difficulty"));
    var level = JSON.parse(localStorage.getItem("Level"));
    var scores = JSON.parse(localStorage.getItem("Scores"));
    
    console.log(difficulty);
    console.log(level);

    var app = angular.module('boxxleApp', [])
    app.controller('mainCtrl', function($scope) {
        $scope.difficulty = difficulty;
        $scope.level = level;

    })
