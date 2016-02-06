const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
	twitter: {
		screen_name: String,
		user_id: String,
	},
	game_data: [GameSaveData],
	
}, {
	collection: 'user'
});

user = mongoose.model('user', User);

module.exports = user;
