'use strict';
const db            = require('../models/db');
const User          = require('../models/user');
const PushesRocksLevel = require('../models/pushesRocksLevelSchema');
const PushesRocksUserData = require('../models/gameSaveDataSchema').PushesRocksUserData;
const GameSaveData = require('../models/gameSaveDataSchema').GameSaveData;
const State         = require('../models/state');
const token         = require('../models/token');
const router        = new (require( 'express' ).Router )();
const path          = require('path');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');


let loginPath = path.join(__dirname, '../views/boxxle', 'login.html');

let newGameSave;
const getFirstLevel = function() {
	PushesRocksLevel.findOne('easy01-level00').lean().select('_id').exec(function (err, level) {
//	PushesRocksLevel.getLevel('easy01-level00', function(level) {
	console.log("lid", level);
		let prUserData = new PushesRocksUserData({ current_level: level._id })
		newGameSave = new GameSaveData({ pushes_rocks: prUserData});
		console.log( JSON.stringify(newGameSave, null, 3) );
	}); 	
};
getFirstLevel();

router.get('/login', (req, res) => {
    res.sendFile(loginPath);
});
mongoose.Promise = Promise; 

router.get('/twitter', (req, res, next) => {
	User.findOne({
		twitter: {
			screen_name: req.query.raw.screen_name,
			user_id: req.query.raw.user_id
		}
	})
	.then((user) => {
		if (user) return user;	
		return new User({
			twitter: {
				screen_name: req.query.raw.screen_name,
				user_id: req.query.raw.user_id
			},
			game_data: newGameSave
		}).save();
	})
	.then((user) => {
		return token.sign(user);
	})
	.then((token, err) => {
		if (err) handleError(err);
		res.redirect(`/play?token=${token}`)
	}).catch(next);
});

module.exports = router;
