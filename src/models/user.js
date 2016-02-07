const mongoose = require('mongoose');
const GameSaveData = require('.gameSaveData');
const User = new mongoose.Schema({
	twitter: {
		screen_name: String,
		user_id: String,
	},
	game_data: GameSaveData,
	
}, {
	collection: 'user'
});

module.exports = mongoose.model('user', User);
