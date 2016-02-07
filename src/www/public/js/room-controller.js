angular.module('myApp')
  .controller('roomCtrl',['$scope','$http','socket',function($scope,$http,clientSocket) {
    $scope.rooms = [];
    $scope.error = '';
    $scope.createRoom = function(){
      $scope.error = '';
      var newRoom = {};
      newRoom.name = $scope.roomName;
      newRoom.usersInRoom = 0;
      newRoom.firstPlayer = 'player';
      newRoom.secondPlayer = 'player';
      newRoom.diff = $scope.diff;
      newRoom.numberOfLevelsToWin = $scope.levels;
      clientSocket.emit('newRoom', newRoom);
    }

    $scope.joinRoom = function(room) {
      if(room.usersInRoom < 2) {
        var url = '/multiplayer/'+room.name+'/'+room.diff+'/'+room.numberOfLevelsToWin;
        window.location.href = url;
        clientSocket.emit('userJoined', room);
      } else {
        room.roomIsFull = 'Sorry that room is full';
      }
    }

    clientSocket.on('rooms', function(data) {
      $scope.rooms = data;
    })

    clientSocket.on('roomError', function(data) {
      $scope.error = data;
    });



  }]
);
