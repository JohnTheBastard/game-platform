'use strict';
const db       = require('./db');
const mongoose = require('mongoose');
const levelData = require('./level-data');
const pushesRocksLevels = require('./pushesRocksLevels.json');
console.log(pushesRocksLevels);
function createLevels() {
    var Schema = mongoose.Schema;

    var Level = new Schema({
        difficulty: String,
        level: Object
    });

    var level = mongoose.model('level', Level);

    //drop collection to prevent duplicates before gen
    let rm = level.find().remove({});
    rm.exec();

    for (let ii = 0; ii < levelData.easy.length; ii++) {
        var easyLevel = new level({
            difficulty: 'easy',
            level: levelData.easy[ii]
        });
        easyLevel.save();
    }
    for (let ii = 0; ii < levelData.hard.length; ii++) {
        var hardLevel = new level({
            difficulty: 'hard',
            level: levelData.hard[ii]
        });
        hardLevel.save();
    }
}
createLevels();
