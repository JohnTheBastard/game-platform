'use strict';
const mongoose = require('mongoose');
const PushesRocksLevel = new mongoose.Schema({  
	identifier: String,
	difficulty: String,
	data: Object,
});

PushesRocksLevel.statics.getLevel = function(levelID, cb){
	console.log(typeof cb);
	mongoose.model('PushesRocksLevel').findOne({identifier: levelID}).lean().select("data").exec(function (err, level) {
		if(err) return cb(err);
		cb( level.data );
	});	
};

PushesRocksLevel.statics.getNextID = function(levelID, cb) {
	console.log(typeof cb);
	mongoose.model('PushesRocksLevel').find().lean().select("identifier").exec(function (err, identifiers) {
		if(err) return cb(err);
		let idArr = identifiers.map( obj => obj.identifier );
		let idIndex = 1 + idArr.indexOf(levelID);
		console.log("In nextID:", idArr[idIndex] );
		cb( null, idArr[idIndex] );
	});  	
};

module.exports = mongoose.model('PushesRocksLevel', PushesRocksLevel);