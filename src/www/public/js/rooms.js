
angular.module('listRoomsApp', ['btford.socket-io'])
  .factory('socket', function(socketFactory){
    return socketFactory()
  })
  .controller('mainCtrl',['$scope','socket',function($scope,socket) {
    $scope.rooms = [];
    $scope.createRoom = function(){
      var roomData = {};
      roomData.name = $scope.roomName;
      roomData.diff = $scope.diff;
      roomData.levels = $scope.levels;
      socket.emit('hello', roomData);
    }
    
    socket.on('there', function(data){
        $scope.rooms = data;
    })

  }]
);
