"use strict";
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var multiplayer = require('./routes/multiplayer');
var rooms = require('./routes/rooms');
var startIO = require('./server-socketio');

function createApp() {
  var app = express();
  startIO(app);
  var publicPath = path.join( __dirname, './www/public/' );
  app.use( express.static(publicPath) );
  app.use( morgan('dev') );
  app.use('/multiplayer', multiplayer());
  app.use('/rooms', rooms());
  return app;
}

var app_module = createApp();
module.exports = app_module;
