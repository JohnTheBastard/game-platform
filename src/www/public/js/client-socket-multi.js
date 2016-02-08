var currentRoom = $.trim($('#roomName').text());
var difficulty = $.trim($('#roomDiff').text());
var waiting = $('#waitingForUser');
var levelsToWin = Number($.trim($('#roomLevelsToWin').text()));
var chatMessageList = $('#chatMessage');
var messageValue = $('#messageValue');
var button = $('#submitButton');
var startingLevel = 0;

startGame(startingLevel, difficulty, levelsToWin);

var clientSocket = io('/multiplayer');

clientSocket.emit('joinedRoom', currentRoom);

clientSocket.on('broad', function(data) {
  secondPlayerKeyDownEvent(data.keyCode);
});

function secondPlayerInput(key) {
  key.preventDefault();
  firstPlayerKeyDownEvent(key.keyCode);
  var input = {};
  input.keyCode = key.keyCode;
  input.roomName = currentRoom;
  clientSocket.emit('move', input);
}

// function sendMessage(e) {
//   e.preventDefault();
//   var message = {};
//   var numberOfListItems = chatMessageList.children().length;
//   if(numberOfListItems > 17 ) {
//     chatMessageList.empty();
//   };
//   message.roomName = currentRoom;
//   message.value = messageValue.val();
//   chatMessageList.append('<li class="player1Message listMessage"> Player 1: '+message.value+'</li>');
//   clientSocket.emit('messageSent', message);
// }

clientSocket.on('startGame', function(data) {
  window.addEventListener("keyup", secondPlayerInput, false);
  waiting.text('GO GO GO GO!!!!!');
  firstPlayerKeyDownEvent(13);
  secondPlayerKeyDownEvent(13);
  clientSocket.emit('otherUserCanStart', data);
});

clientSocket.on('userLeft', function(data) {
  waiting.text('SORRY THE OTHER USER LEFT PLEASE GO BACK TO ROOMS');
  window.removeEventListener("keyup",secondPlayerInput, false);
  button.unbind();
});

var messageClientSocket = io('/message');
messageClientSocket.emit('joinedMessage', currentRoom);
  function sendMessage(e) {
    e.preventDefault();
    var message = {};
    var numberOfListItems = chatMessageList.children().length;
    if(numberOfListItems > 17 ) {
      chatMessageList.empty();
    };
    message.roomName = currentRoom;
    message.value = messageValue.val();
    chatMessageList.append('<li class="player1Message listMessage"> Player 1: '+message.value+'</li>');
    messageClientSocket.emit('messageSent', message);
  }

  messageClientSocket.on('player2Message', function(data){
    var numberOfListItems = chatMessageList.children().length;
    if(numberOfListItems > 17 ) {
      chatMessageList.empty();
    };
    chatMessageList.append(data.html);
  })

  messageClientSocket.on('userLeft', function(data) {
    waiting.text('SORRY THE OTHER USER LEFT PLEASE GO BACK TO ROOMS');
    window.removeEventListener("keyup",secondPlayerInput, false);
    button.unbind();
  });


  button.click(sendMessage);
