const mongoose = require('mongoose');
const db       = require('./db');
var Schema = mongoose.Schema;

var Levels = new Schema({
  level: Object
})

levels = mongoose.model('levels', Levels)
