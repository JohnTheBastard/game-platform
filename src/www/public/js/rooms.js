
angular.module('listRoomsApp', ['btford.socket-io'])
  .factory('socket', function(socketFactory) {
    var myRoomSocket = io('/rooms');
    mySocket = socketFactory({
      ioSocket: myRoomSocket
    });
    return mySocket;
  })
  .controller('mainCtrl',['$scope','socket',function($scope,clientSocket) {
    $scope.rooms = [];
    $scope.error = '';
    $scope.$watch('rooms');
    $scope.createRoom = function(){
      $scope.error = '';
      var roomData = {};
      roomData.name = $scope.roomName;
      roomData.diff = $scope.diff;
      roomData.levels = $scope.levels;
      roomData.users = 0;
      clientSocket.emit('newRoom', roomData);
    }

    $scope.joinRoom = function(room) {
      clientSocket.emit('userJoined', room);
    }
    clientSocket.on('rooms', function(data) {
      $scope.rooms = data;
    })

    clientSocket.on('existingRoom', function() {
      $scope.error = 'Sorry that room name already exists. Please try again or join an availabe room';
    });



  }]
);
