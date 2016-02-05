var db       = require('./db');
var mongoose = require('mongoose');
var levelData = require('../games/pushesRocks/pushesRocksLevels.json');

function createLevels() {
    var Schema = mongoose.Schema;

    var Level = new Schema({
		identifier: String,
		difficulty: String,
		data: Object,
    });

    var level = mongoose.model('level', Level);

    //drop collection to prevent duplicates before gen
    var rm = level.find().remove({});
    rm.exec();
	
    for (var ii = 0; ii < levelData.length; ii++) {
	    console.log(levelData[ii]);
        var easyLevel = new level(levelData[ii]);
        easyLevel.save();
    }
}
createLevels();