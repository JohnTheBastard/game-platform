const mongoose = require('mongoose');
//const PushesRocksLevel = require('./pushesRocksLevelSchema');

/* TEMP TEMP TEMP */
const PushesRocksLevel = new mongoose.Schema({  
	identifier: String,
	difficulty: String,
	data: Object,
});

const pushesRocksLevel = mongoose.model('pushesRocksLevel', PushesRocksLevel);

/******************/



const PushesRocksBestScore = new mongoose.Schema({
	level: String,
	score: Number
});
const pushesRocksBestScore = mongoose.model('pushesRocksBestScore', PushesRocksBestScore);


const PushesRocksUserData = new mongoose.Schema({
	current_level: {Type: mongoose.Schema.Types.ObjectId, ref: 'pushesRocksLevel'},
	scores: [PushesRocksBestScore]
});
const pushesRocksUserData = mongoose.model('pushesRocksUserData', pushesRocksUserData);


const GameSaveData = new mongoose.Schema({
	pushes_rocks: {Type: mongoose.Schema.Types.ObjectId, ref: 'pushesRocksUserData'}
});

const gameSaveData = mongoose.model('gameSaveData', GameSaveData);
module.exports = gameSaveData;
