/* global angular */
var app = angular.module('boxxleApp', []);
app.controller('gameCtrl', function($scope, $element) {
    var el = angular.element(document.querySelector('#gameBoard'));
    $scope.game = createBoxxer(el);
    console.log($scope.game.game);
})
// 
// app.controller('dataCtrl', function($scope, $resource) {
//     var data = $resource('/api/v1/data/:id', {
//         id: '@_id'
//     })
//     $scope.state = Todo.query()
//     $scope.addData = function() {
//         var state = new State();
//         todo.$save(function() {
//             $scope.state.push(state)
//         })
//     }
// })
