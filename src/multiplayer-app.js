"use strict";
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var portNumber = 8080;
var peopleID = {};
var rooms = [];
var roomName = {};


var publicPath = path.join( __dirname, '../client/public/' );
app.use( express.static(publicPath) );
app.use( morgan('dev') );
app.set('port', portNumber);

app.get('/multiplayer', function(request,response) {
  response.redirect('multiplayer.html');
});

server.listen(app.get('port'), function(){
  console.log('server is conncected')
});

var multiplayerIO = io.of('/multiplayer');
var roomIO = io.of('/rooms');

multiplayerIO.on('connection', function(serverSocket) {
  console.log('someone connected on multiplayer');
  serverSocket.on('move', function(data){
    serverSocket.broadcast.emit('broad',data);
  })

  serverSocket.on('disconnect', function(){
    console.log('user disconnected from multiplayer');
  });
})

roomIO.on('connection', function(serverSocket) {
  console.log('user connected to rooms namespace');
  serverSocket.emit('rooms', rooms);

  serverSocket.on('newRoom', function(data) {
    if(!roomName[data.name]) {
      roomName[data.name] = data;
      rooms.push(data);
      serverSocket.emit('rooms', rooms);
      serverSocket.broadcast.emit('rooms',rooms);
    } else {
      serverSocket.emit('existingRoom');
    }
  })

  serverSocket.on('userJoined', function(data){
    roomName[data.name].users++;
    if(roomName[data.name].users === 2) {
      rooms = rooms.filter(function(object){
        if(object.name !== data.name) {
          return object;
        }
      });
      roomName[data.name] = null;
      serverSocket.emit('rooms',rooms);
      serverSocket.broadcast.emit('rooms',rooms);
    }
  });

  serverSocket.on('disconnect', function(){
    console.log('user disconnected from rooms');
  });

});
