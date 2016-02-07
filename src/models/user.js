const mongoose = require('mongoose');
const GameSaveData = require('./gameSaveDataSchema');
const User = new mongoose.Schema({
	twitter: {
		screen_name: String,
		user_id: String,
	},
	game_data: { type: mongoose.Schema.Types.ObjectId, ref: 'gameSaveData'}
}, {
	collection: 'user'
});
const user = mongoose.model('user', User);
module.exports = user;
