
var app = angular.module('boxxleApp', []);
app.controller('gameCtrl', function($scope, $element) {
    var el = angular.element(document.querySelector('#gameBoard'));
    $scope.game = createBoxer(el);
    console.log($scope.game.game);
})
