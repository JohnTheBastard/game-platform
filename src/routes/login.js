'use strict';
const db            = require('../models/db');
const User          = require('../models/user');
const PushesRocksLevel = require('../models/pushesRocksLevelSchema');
const State         = require('../models/state');
const token         = require('../models/token');
const router        = new (require( 'express' ).Router )();
const path          = require('path');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

let loginPath = path.join(__dirname, '../views/boxxle', 'login.html');


/*
const FOOFOO = new mongoose.Schema({  
	identifier: String,
	difficulty: String,
	data: Object,
});
let foofoo = mongoose.model('fooFoo', FOOFOO);
*/

let firstLevel;
const getFirstLevel = function() {
	PushesRocksLevel.getLevel('easy01-level00', function(level) {
//		firstLevel = new mongoose.model('fooFoo', FOOFOO)({	identifier: level.identifier, 
		firstLevel = new PushesRocksLevel({	identifier: level.identifier, 
											difficulty: level.difficulty, 
											data: level.data });
		console.log(' l:', level instanceof mongoose.model('pushesRocksLevel') );
		console.log('fl:', firstLevel instanceof mongoose.model('pushesRocksLevel') );
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
			game_data: { 
				pushes_rocks: { 
					current_level: firstLevel
				} 
			}
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
