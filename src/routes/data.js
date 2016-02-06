'use strict';
const express = require('express');
const router = express.Router();
const Level = require('../models/pushesRocksLevelSchema');
const User = require('../models/user.js');

//const nextLevel = require('../utils/nextLevel').nextLevel;

let firstLevelID = "easy01-level03";
let secondLevelID = "easy01-level04";


const nextID = function(levelID, cb) {
    Level.find().lean().select("identifier").exec(function (err, identifiers) {
		if(err) return cb(err);
		let idArr = identifiers.map( obj => obj.identifier );
		let idIndex = 1 + idArr.indexOf(levelID);
		console.log("In nextID:", idArr[idIndex] );
		callback( null, idArr[idIndex] );
	});  	
};

const getLevel = function(levelID, res, next){
	Level.findOne({identifier: levelID}).lean().select("data").exec(function (err, level) {
		if(err) return next(err);
		res.json(level);
	});	
};

const saveUserData = function(newUserData, cb){
	//code to save user data goes here
	// BTW: you're gonna need to pass in the levelID so you know where you're saving
    //let achievement = new USERMODEL( newUserData );
    //achievment.save( cb );
    console.log("In saveUserData:", newUserData.levelID);
    
    let fakeData = { levelID: secondLevelID };
    process.nextTick( function(someData, cb) { 
	    nextID( fakeData.levelID, cb );
	 });
};

router.post('/', function(req, res, next) {
	//console.log(req.body);
    // set the levelID from body
    let levelID = req.body.levelID;
    console.log("In POST:        ", levelID);
    saveUserData(req.body, function(err){
        if(err) return next(err);
        
        nextID(levelID, function(err, nextLevelID) {
            if(err) return next(err);
            res.json({ nextLevelID: nextLevelID });   //formerly// getLevel( nextLevelID, res, next);
        });
        
    });
});	//res.end();

router.get('/', function(req, res, next) {
	getLevel( firstLevelID, res, next );
});


module.exports = router;
