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

let firstLevel;
let getFirstLevel = function() { 
	PushesRocksLevel.getLevel('easy01-level00', function(level) {
		firstLevel = new PushesRocksLevel(level);
	}); 	
};
getFirstLevel();

let prUserData, newGameSave;
const makeNewGameSaveData = function() {
	PushesRocksLevel.getLevel('easy01-level00', function(level) {
        prUserData = new PushesRocksUserData({ current_level: level});
		newGameSave = new GameSaveData({ pushes_rocks: prUserData});
	}); 	
};
const saveNewGameSaveData = function() {
	prUserData.save();
	newGameSave.save();
}

router.get('/login', (req, res) => {
    res.sendFile(loginPath);
});
mongoose.Promise = Promise; 

router.get('/twitter', (req, res, next) => {
	makeNewGameSaveData(); 			//start this now, incase we need it. fix later
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

/* New Code:
function createNewUser(){
	return PushesRocksLevel.getLevel('easy01-level00')
		.then( level => {
			return new PushesRocksUserData({ current_level: level.id }).save();
		})
		.then( userData => {
			return new GameSaveData({ pushes_rocks: userData.id }).save();
		})
		.then( gameData => {
			return new User({
				twitter: {
					screen_name: req.query.raw.screen_name,
					user_id: req.query.raw.user_id
				},
				game_data: gameData.id
			}).save();
		});
}

router.get('/login', (req, res) => {
    res.sendFile(loginPath);
});
mongoose.Promise = Promise; 
​
router.get('/twitter', (req, res, next) => {
	User.findOne({
		twitter: {
			screen_name: req.query.raw.screen_name,
			user_id: req.query.raw.user_id
		}
	})
	.then( user => user ? user : User.createNew() ) //createNewUser() )
	.then( user => token.sign(user) )
	.then( token => res.send({ token }) )
	.catch(next);
});
*/



module.exports = router;
