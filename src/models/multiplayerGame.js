const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MultiPlayerGame = new Schema({
    roomName: String,
    startingLevel: Number,
    moves: [],
    movesCompleted: Number,
    currentMove: Number,
    playerName: String,
    numberOfLevelsToWin: Number
}, {
    collection: 'multiPlayerGame'
});

multiPlayerGame = mongoose.model('multiPlayerGame', MultiPlayerGame);

module.exports = multiPlayerGame;
