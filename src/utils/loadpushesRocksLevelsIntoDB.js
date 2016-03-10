"use strict";
const mongoose = require('mongoose');
const db       = require('../models/db');
const Level = require('../models/pushesRocksLevelSchema');
const levelData = require('../games/pushesRocks/pushesRocksLevels.json');

let cb = function(err, level){
	if(err) console.log("ERROR: ", err, "\n  on level: ", level.identifier);
};

function loadPushesRocksLevelsIntoDB() {
    let rm = Level.find().remove({});
    rm.exec();
    levelData.forEach( data => new Level(data).save(cb) );
}
loadPushesRocksLevelsIntoDB();
