const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PushesRocksBestScore = new Schema({
	level: String,
	score: Number
});

const PushesRocksUserData = new Schema({
	current_level: PushesRocksLevelSchema,
	best_scores: [PushesRocksBestScore]
}, {
    collection: 'user'
});


const GameSaveData = new Schema({
	pushes_rocks: PushesRocksUserData
});

gameSaveDataSchema = mongoose.model('gameSaveData', gameSaveData);

module.exports = gameSaveDataSchema;
