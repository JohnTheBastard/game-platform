const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
    name: { type: String, required: true, unique: true },
    usersInRoom: Number,
    firstPlayer: String,
    secondPlayer: String,
    numberOfLevelsToWin: { type: Number, required: true },
    diff: { type: String, required: true }
}, {
    collection: 'Rooms'
});

room = mongoose.model('Rooms', Room);

module.exports = room;
