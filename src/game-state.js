'use strict';
const http = require('http');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const data = require('./routes/data');


const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.set('view engine', 'ejs');
app.set( 'views', path.join( __dirname, 'views' ) );

// restify.serve(app, ToDoModel, {
//   // exclude: 'text,done'
// })

let publicPath = path.join(__dirname, 'www/public');
app.use( express.static( publicPath ) );



app.use("/data", data);
app.use('/', function (req, res) {
	res.render( 'boxxle/play' );
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
