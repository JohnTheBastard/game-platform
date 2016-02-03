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
var people = [];
var rooms = {};
var clients = {};

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

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('move', function(data){
    socket.broadcast.emit('broad',data);
  })

  socket.on('hello', function(data){
    people.push(data);
    socket.emit('there', people);
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});
