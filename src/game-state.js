var http = require('http')
var express = require('express')
var path = require('path');
var morgan = require('morgan');
var restify = require('express-restify-mongoose')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todos')

var ToDoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false }
})
var ToDoModel = mongoose.model('ToDo', ToDoSchema)

var app = express()
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))
restify.serve(app, ToDoModel, {
  // exclude: 'text,done'
})

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../src/views/play', 'play.html'));
})

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
