angular.module('listRoomsApp', ['btford.socket-io'])
  .factory('socket', function(socketFactory) {
    var myRoomSocket = io('/rooms');
    mySocket = socketFactory({
      ioSocket: myRoomSocket
    });
    return mySocket;
  })
  .controller('mainCtrl',['$scope','$http','socket',function($scope,$http,clientSocket) {
    $scope.rooms = [];
    $scope.error = '';
    $scope.createRoom = function(){
      $scope.error = '';
      var newRoom = {};
      newRoom.name = $scope.roomName;
      newRoom.usersInRoom = 0;
      newRoom.creator = $scope.creator;
      newRoom.firstPlayer = $scope.creator;
      newRoom.numberOfLevelsToWin = $scope.levels;
      clientSocket.emit('newRoom', newRoom);
    }

    $scope.joinRoom = function(room) {
      clientSocket.emit('userJoined', room);
    }

    clientSocket.on('rooms', function(data) {
      $scope.rooms = data;
    })

    clientSocket.on('roomError', function(data) {
      $scope.error = data;
    });



  }]
);
