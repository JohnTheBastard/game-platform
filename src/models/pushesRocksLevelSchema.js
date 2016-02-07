'use strict';
const mongoose = require('mongoose');
const PushesRocksLevel = new mongoose.Schema({  
	identifier: String,
	difficulty: String,
	data: Object,
});

PushesRocksLevel.statics.getLevel = function(levelID, cb){
	PushesRocksLevel.findOne({identifier: levelID}).lean().select("data").exec(function (err, level) {
		if(err) return cb(err);
		cb( null, level );
	});	
};

PushesRocksLevel.statics.getNextID = function(levelID, cb) {
	PushesRocksLevel.find().lean().select("identifier").exec(function (err, identifiers) {
		if(err) return cb(err);
		let idArr = identifiers.map( obj => obj.identifier );
		let idIndex = 1 + idArr.indexOf(levelID);
		console.log("In nextID:", idArr[idIndex] );
		cb( null, idArr[idIndex] );
	});  	
};

module.exports = mongoose.model('PushesRocksLevel', PushesRocksLevel);