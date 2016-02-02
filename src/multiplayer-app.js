
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./models/db');
var blob = require('./models/blobs');
var routes = require('./routes/index');
var blobs = require('./routes/blobs');
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var publicPath = path.join( __dirname, '../client/public/' );
app.use( express.static(publicPath) );
app.use( morgan('dev') );

app.get('/multiplayer', function(request,response) {
  response.redirect('multiplayer.html');
});

server.listen(3030, function(){
  console.log('server is conncected')
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('move', function(data){
    socket.broadcast.emit('broad',data);
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});
