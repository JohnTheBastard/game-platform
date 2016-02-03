const express      = require('express')
const morgan       = require('morgan')
const session      = require('express-session')
const cookieParser = require('cookie-parser');
const path         = require('path');
const bodyParser   = require('body-parser');
const MongoStore   = require('connect-mongo')(session);
const login        = require( './routes/login' );
var Grant          = require('grant-express'),
    grant          = new Grant(require('../config.json'))
var app            = express();

app.use(morgan('dev'))

app.use(express.static( path.join(__dirname, '../client/public')));

app.use(session({
  store: new MongoStore({db:'boxxle'}),
  secret: 'very secret',
  resave: true,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(grant);
app.use(login);

app.listen(3000, function () {
  console.log('Server-on: 3000')
})
module.exports = app;
