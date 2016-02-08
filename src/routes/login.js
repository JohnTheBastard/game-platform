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


/* DEMONSTRATION CODE */
const wtf = function() {
	User.find()
	.populate('game_data')
	.then( user => new GameSaveData(user.game_data) ) 
	.populate('pushes_rocks')
	.then( game_data => PushesRocksUserData(game_data.pushes_rocks) ) 
	.populate('current_level')
	.then( pushes_rocks => PushesRocksLevel(pushes_rocks.current_level) )
	.exec(function (err, current_level) {
		console.log( "user.game_data.pushes_rocks.current_level: ", JSON.stringify(current_level) );
	})
	.then( () => console.log("I'm done!") );
};
//wtf();
/**********************/


let firstLevel;
let getFirstLevel = function() { 
	PushesRocksLevel.getLevel('easy01-level00', function(level) {
		firstLevel = new PushesRocksLevel(level);
	}); 	
};
getFirstLevel();

let prUser, newGameSave;
const makeNewGameSaveDave = function() {
	PushesRocksLevel.getLevel('easy01-level00', function(level) {
		let prUserData = new PushesRocksUserData({ current_level: level});
		newGameSave = new GameSaveData({ pushes_rocks: prUserData});
	}); 	
};
const saveNewGameData = function() {
	prUserData.save();
	newGameSave.save();
}

router.get('/login', (req, res) => {
    res.sendFile(loginPath);
});
mongoose.Promise = Promise; 

router.get('/twitter', (req, res, next) => {
	makeNewGameSaveData(); 			//start this now, incase we need it
	User.findOne({
		twitter: {
			screen_name: req.query.raw.screen_name,
			user_id: req.query.raw.user_id
		}
	})
	.then((user) => {
		if (user) return user;
		saveNewGameSaveData();
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
