'use strict';
const express = require('express');
const router = express.Router();
const Level = require('../models/pushesRocksLevelSchema');
const User = require('../models/user.js');

//const nextLevel = require('../utils/nextLevel').nextLevel;

let firstLevelID = "easy01-level03";
let secondLevelID = "easy01-level04";


const nextID = function(levelID, res, next) {
	Level.find().lean().select("identifier").exec(function (err, identifiers) {
		if(err) return next(err);
		console.log("list of identifiers:\n", res.json(identifiers) );

		let idArr = identifiers.map( obj => obj.identifier );
		let idIndex = 1 + idArr.indexOf(levelID);
		console.log("OMG DID IT WORK?", idArr[idIndex]);

		res.json(idArr[idIndex]);
	});	
};



const getLevel = function(levelID, res, next){
	Level.findOne({identifier: levelID}).lean().select("data").exec(function (err, level) {
		if(err) return next(err);
		res.json(level);
	});	
};

const saveUserData = function(newUserData, res, next){
	//code to save user data goes here
	// BTW: you're gonna need to pass in the levelID so you know where you're saving
	console.log("EXPRESS CONSOLE:", secondLevelID);
	res.send(secondLevelID);
};

router.get('/', function(req, res, next) {
	getLevel( firstLevelID, res, next );
});

router.post('/', function(req, res, next) {
	//console.log(req.body);
	saveUserData(req.body, res, function(err, levelID){
		console.log("POST CALLBACK EXECUTING...");
		if(err) return next(err);
		console.log("...WITH NO ERRORS (YET).");
		
		
		nextID(levelID, res, function(err, nextLevelID, next) {
			console.log("2ND CB NOW...");
			if(err) return next(err);
			getLevel(nextLevelID, res, next);
		});
	});
	//res.end();
});

module.exports = router;
