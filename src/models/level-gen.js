'use strict';
const db       = require('./db');
const mongoose = require('mongoose');
const levelData = require('./pushesRocksLevels.json');

function createLevels() {
    var Schema = mongoose.Schema;

    var Level = new Schema({
      identifier: String,
      difficulty: String,
      data: Object,
    });

    var level = mongoose.model('level', Level);
    //drop collection to prevent duplicates before gen
    let rm = level.find().remove({});
    rm.exec();

    for (let ii = 0; ii < levelData.length; ii++) {
        var easyLevel = new level({
            identifier: levelData[ii].identifier,
            difficulty: levelData[ii].difficulty,
            data: levelData[ii].data
        });
        easyLevel.save();
    }
}
createLevels();
