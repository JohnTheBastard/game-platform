const mongoose = require('mongoose');
const PushesRocksLevel = require('./pushesRocksLevelSchema');


const PushesRocksBestScore = new mongoose.Schema({
	level: String,
	score: Number
});
const pushesRocksBestScore = mongoose.model('pushesRocksBestScore', PushesRocksBestScore);


const PushesRocksUserData = new mongoose.Schema({
	current_level: {type: Number, ref: 'pushesRocksLevel'},
	current_level: {type: mongoose.Schema.Types.ObjectId, ref: 'pushesRocksLevel'},
	scores: [PushesRocksBestScore]
});
const pushesRocksUserData = mongoose.model('pushesRocksUserData', PushesRocksUserData);


const GameSaveData = new mongoose.Schema({
	pushes_rocks: {type: mongoose.Schema.Types.ObjectId, ref: 'pushesRocksUserData'}
});

const gameSaveData = mongoose.model('gameSaveData', GameSaveData);

module.exports = {	PushesRocksBestScore: pushesRocksBestScore,
					PushesRocksUserData: pushesRocksUserData,
					GameSaveData: gameSaveData };

