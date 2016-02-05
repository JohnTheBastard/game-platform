"use strict";
const db       = require('./db');
const mongoose = require('mongoose');
const level = require('./rockPushesRocksSchema');
const levelData = require('../games/pushesRocks/pushesRocksLevels.json');

function loadPushesRocksLevelsIntoDB() {
    //drop collection to prevent duplicates before gen
    let rm = level.find().remove({});
    rm.exec();
    
    levelData.forEach( (level)=> {
	    level.save();
    });
}
loadPushesRocksLevelsIntoDB();