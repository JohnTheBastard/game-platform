"use strict";
const mongoose = require('mongoose');
const db       = require('../models/db');
const LevelModel = require('../models/pushesRocksLevelSchema');
const levelData = require('../games/pushesRocks/pushesRocksLevels.json');


let level = new LevelModel( levelData[0] );
level.save((err, level) => console.log("ERROR: ", err, "\n", level));

function loadPushesRocksLevelsIntoDB() {
    //drop collection to prevent duplicates before gen
/*
    let rm = LevelModel.find().remove({});
    rm.exec();
    
    levelData.forEach( data => new Level(data).save() );
*/
}
loadPushesRocksLevelsIntoDB();