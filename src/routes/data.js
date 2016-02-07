'use strict';
const express = require('express');
const router = express.Router();
const PushesRocksLevel = require('../models/pushesRocksLevelSchema');
const User = require('../models/user.js');

let firstLevelID = "easy01-level03";
let secondLevelID = "easy01-level04";

/* GET Level */

router.get('/', function(req, res, next) {
	PushesRocksLevel.getLevel( firstLevelID, res.json.bind(res) );
});

/* POST Level Completion */

router.post('/', function(req, res, next) {
	saveUserData(req.body, function(err, nextLevelID ){
		if(err) return next(err);
		PushesRocksLevel.getLevel( nextLevelID, res.json.bind(res) );
	});
});

const saveUserData = function(newUserData, cb){
	//code to save user data goes here
	// BTW: you're gonna need to pass in the levelID so you know where you're saving
	//let achievement = new USERMODEL( newUserData );
	//achievment.save( cb );
	console.log("In saveUserData:", newUserData.levelID);
	
	//pretend to save data
	process.nextTick( function() { 
		// pass back the next id
		PushesRocksLevel.getNextID( newUserData.levelID, cb );
	});
};


module.exports = router;