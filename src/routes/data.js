'use strict';
const express = require('express');
const router = express.Router();
const PushesRocksLevel = require('../models/pushesRocksLevelSchema');
const User = require('../models/user.js');

//const nextLevel = require('../utils/nextLevel').nextLevel;

let firstLevelID = "easy01-level03";
let secondLevelID = "easy01-level04";

/* GET Level */

router.get('/', function(req, res, next) {
	getLevel( firstLevelID, res );
});


const getLevel = function(levelID, res, next){
	PushesRocksLevel.findOne({identifier: levelID}).lean().select("data").exec(function (err, level) {
		if(err) return next(err);
		res.json(level);
	});	
};


/* POST Level Completion */

router.post('/', function(req, res, next) {
	saveUserData(req.body, function(err, nextLevelID ){
		if(err) return next(err);
		getLevel( nextLevelID, res );
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
		nextID( newUserData.levelID, cb );
	});
};

const nextID = function(levelID, cb) {
	PushesRocksLevel.find().lean().select("identifier").exec(function (err, identifiers) {
		if(err) return cb(err);
		let idArr = identifiers.map( obj => obj.identifier );
		let idIndex = 1 + idArr.indexOf(levelID);
		console.log("In nextID:", idArr[idIndex] );
		cb( null, idArr[idIndex] );
	});  	
};

module.exports = router;