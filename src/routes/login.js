'use strict';
const db            = require('../models/db');
const User          = require('../models/user');
const PushesRocksLevel = require('./pushesRocksLevelSchema');
const State         = require('../models/state');
const token         = require('../models/token');
const router        = new (require( 'express' ).Router )();
const path          = require('path');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

let loginPath = path.join(__dirname, '../views', 'login.html');

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
