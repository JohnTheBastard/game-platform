const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
    name: { type: String, required: true, unique: true },
    usersInRoom: Number,
    creator: { type: String, required: true, unique: true },
    firstPlayer: String,
    secondPlayer: String,
    numberOfLevelsToWin: Number
}, {
    collection: 'multiPlayerRooms'
});

room = mongoose.model('multiPlayerRooms', Room);

module.exports = room;
