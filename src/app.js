const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const loadLevels = require('./utils/loadpushesRocksLevelsIntoDB')
const session      = require('express-session');
const Grant        = require('grant-express'),
      grant        = new Grant( require('./config/grantConfig') );

const multiplayer = require('./routes/multiplayer');

const data = require('./routes/data');

const routes = require('./routes/index');
const login = require( './routes/login' );
const play = require( './routes/play' );
const guest = require( './routes/guest-play' );
const authenticated = require('./routes/authroute');

function createApp() {

	const app = express();

	const publicPath = path.join( __dirname, 'www/public' );
	const viewPath = path.join( __dirname, 'views' );

	// view engine setup
	app.set( 'views', path.join( __dirname, 'views' ) );
	//app.set( 'view engine', 'hbs' );

	//	app.set( 'view engine', 'jade' );
	app.set('view engine', 'ejs');

	app.use( favicon( path.join( publicPath, 'img/favicon.ico' ) ) );
	app.use( morgan('dev') );

	// parse application/x-www-form-urlencoded
	app.use( bodyParser.urlencoded( { extended: false } ) );
	// parse application/json
	app.use( bodyParser.json() );
	app.use( cookieParser() );
	app.use( express.static( publicPath, { redirect : false } ) );
	app.use( express.static( viewPath, { redirect : false } ) );

	/* * * * * * * * * *
	 * authenitcation  *
	 * * * * * * * * * */
	app.use(session({
		secret: process.env.OPENSHIFT_SECRET_TOKEN || process.env.APP_SECRET,
		resave: true,
		saveUninitialized: true
	}));

	app.use('/', routes);
//	app.use('/', routes);
	app.use(grant);

	app.use(login);
	app.use('/play', authenticated, play);
  app.use('/guest', guest);
	app.use("/data", data);

	/* * * * * * * * * *
	 * multiplayer     *
	 * * * * * * * * * */
	app.use('/multiplayer', multiplayer());

	/* * * * * * * * * *
	 * error handlers  *
	 * * * * * * * * * */

	// catch 404 and forward to error handler
	app.use( (req, res, next) => {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// development error handler
	// will print stacktrace
	if ( app.get('env') === 'development' ) {
		app.use(function(err, req, res) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use( (err, req, res) => {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});

	return app;
}

var app_module = createApp();
module.exports = app_module;
