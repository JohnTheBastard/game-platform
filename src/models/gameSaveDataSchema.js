const mongoose = require('mongoose');
const PushesRocksLevel = require('./pushesRocksLevelSchema');


const PushesRocksBestScore = new mongoose.Schema({
	level: String,
	score: Number
});

const PushesRocksUserData = new mongoose.Schema({
	current_level: PushesRocksLevel,
	best_scores: [PushesRocksBestScore]
}, {
    collection: 'user'
});


const GameSaveData = new mongoose.Schema({
	pushes_rocks: PushesRocksUserData
});

module.exports = mongoose.model('gameSaveData', GameSaveData);
